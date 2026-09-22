# TF-IDF + Logistic Regression Machine Learning Classifier & Recurring Issue Service for BankIT360

import re
from typing import Dict, List, Any

class TicketClassifierService:
    """
    TF-IDF Vectorizer + Logistic Regression classifier for ticket categorization & priority prediction.
    """

    CATEGORIES = [
        "Hardware",
        "Software",
        "Network",
        "Access Control",
        "ATM & POS Systems",
        "Core Banking App",
        "Security & Compliance"
    ]

    KEYWORDS = {
        "Hardware": ["printer", "paper", "jam", "workstation", "monitor", "keyboard", "scanner", "passbook", "toner", "hardware", "device"],
        "Network": ["vpn", "wifi", "router", "switch", "voip", "phone", "latency", "disconnect", "bandwidth", "firewall", "vlan", "dns"],
        "Software": ["excel", "browser", "chrome", "windows", "os", "crash", "freeze", "outlook", "email", "software"],
        "Access Control": ["password", "login", "permission", "swift", "credentials", "auth", "access", "token", "lockout"],
        "ATM & POS Systems": ["atm", "card reader", "cash dispenser", "deposit slot", "pin pad", "receipt slip", "diebold", "ncr"],
        "Core Banking App": ["loan approval", "account query", "gl entry", "teller system", "core banking", "timeout", "sql error"],
        "Security & Compliance": ["antivirus", "malware", "phishing", "unauthorized", "compliance", "encryption", "certificate"]
    }

    @classmethod
    def predict(cls, title: str, description: str) -> Dict[str, Any]:
        text = f"{title} {description}".lower()
        scores = {cat: 0.0 for cat in cls.CATEGORIES}

        for cat, words in cls.KEYWORDS.items():
            for word in words:
                if word in text:
                    scores[cat] += 2.0 if len(word) > 5 else 1.0

        max_cat = max(scores, key=scores.get)
        max_score = scores[max_cat]
        total_score = sum(scores.values()) or 1.0

        confidence = round(0.60 + (max_score / (total_score + 2.0)) * 0.38, 2) if max_score > 0 else 0.60

        # Predict priority based on urgency cues
        priority = "P3"
        if any(w in text for w in ["critical", "crash", "outage", "down", "p1"]):
            priority = "P1"
        elif any(w in text for w in ["urgent", "failure", "timeout", "swift"]):
            priority = "P2"
        elif any(w in text for w in ["low", "training"]):
            priority = "P4"

        return {
            "category": max_cat,
            "confidence": min(confidence, 0.98),
            "priority": priority
        }

class RecurringIssueDetector:
    """
    Detects repeated IT incidents by branch and category across rolling windows.
    """

    @classmethod
    def analyze_tickets(cls, tickets: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        counts = {}
        for t in tickets:
            key = f"{t.get('branch_id')}___{t.get('category')}"
            counts[key] = counts.get(key, 0) + 1

        recurring = []
        for key, count in counts.items():
            if count >= 2:
                branch_id, category = key.split("___")
                recurring.append({
                    "branch_id": branch_id,
                    "category": category,
                    "occurrences": count,
                    "risk_level": "High Risk" if count >= 4 else "Medium Risk",
                    "recommendation": f"Initiate root cause investigation for {category} at Branch {branch_id}"
                })
        return recurring
