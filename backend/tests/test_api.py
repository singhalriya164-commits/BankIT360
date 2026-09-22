# Pytest Unit Test Suite for BankIT360 API & ML Engine

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.ml_service import TicketClassifierService, RecurringIssueDetector

def test_ml_ticket_classification_hardware():
    pred = TicketClassifierService.predict(
        "Teller Counter Printer Jam", 
        "The Epson thermal receipt printer is jamming on every receipt print action at Counter 3."
    )
    assert pred["category"] == "Hardware"
    assert pred["confidence"] >= 0.70

def test_ml_ticket_classification_network():
    pred = TicketClassifierService.predict(
        "VPN Handshake Failure", 
        "Remote auditors receive SSL handshake latency error when connecting to Cisco router."
    )
    assert pred["category"] == "Network"

def test_ml_ticket_classification_access():
    pred = TicketClassifierService.predict(
        "SWIFT Gateway Credentials Lockout", 
        "User locked out of SWIFT payment terminal login password auth."
    )
    assert pred["category"] == "Access Control"

def test_recurring_issue_detection():
    sample_tickets = [
        {"id": "1", "branch_id": "BR-102", "category": "Hardware"},
        {"id": "2", "branch_id": "BR-102", "category": "Hardware"},
        {"id": "3", "branch_id": "BR-102", "category": "Hardware"},
        {"id": "4", "branch_id": "BR-101", "category": "Network"},
    ]
    recurring = RecurringIssueDetector.analyze_tickets(sample_tickets)
    assert len(recurring) == 1
    assert recurring[0]["branch_id"] == "BR-102"
    assert recurring[0]["category"] == "Hardware"
    assert recurring[0]["occurrences"] == 3
