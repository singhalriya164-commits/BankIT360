# SQLAlchemy Database Schema for BankIT360 (12 Core Tables)

from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Department(Base):
    __tablename__ = "departments"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    code = Column(String, nullable=False)

class Branch(Base):
    __tablename__ = "branches"
    id = Column(String, primary_key=True)
    branch_code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    region = Column(String, nullable=False)
    city = Column(String, nullable=False)
    manager_name = Column(String)
    health_score = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False) # bank_employee, it_support_engineer, it_administrator, it_manager
    title = Column(String)
    department = Column(String)
    branch_id = Column(String, ForeignKey("branches.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(String, primary_key=True)
    ticket_number = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False) # Hardware, Software, Network, Access Control, ATM/POS, Core Banking
    priority = Column(String, nullable=False) # P1, P2, P3, P4
    status = Column(String, default="Open") # Open, Assigned, In Progress, Resolved, Closed
    requester_id = Column(String, ForeignKey("users.id"))
    assigned_to_id = Column(String, ForeignKey("users.id"))
    branch_id = Column(String, ForeignKey("branches.id"))
    sla_deadline = Column(DateTime)
    is_sla_breached = Column(Boolean, default=False)
    ai_suggested_category = Column(String)
    ai_confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

class TicketComment(Base):
    __tablename__ = "ticket_comments"
    id = Column(String, primary_key=True)
    ticket_id = Column(String, ForeignKey("tickets.id"))
    user_id = Column(String, ForeignKey("users.id"))
    author_name = Column(String)
    comment_text = Column(Text, nullable=False)
    is_internal = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(String, primary_key=True)
    incident_code = Column(String, unique=True)
    title = Column(String, nullable=False)
    severity = Column(String, nullable=False) # P1 Critical - P4 Low
    status = Column(String, default="Investigating")
    branch_id = Column(String, ForeignKey("branches.id"))
    reported_by_id = Column(String)
    lead_engineer_id = Column(String)
    root_cause = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

class Asset(Base):
    __tablename__ = "assets"
    id = Column(String, primary_key=True)
    asset_tag = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    make_model = Column(String)
    branch_id = Column(String, ForeignKey("branches.id"))
    current_user_id = Column(String, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="In Service") # In Service, Under Maintenance, Faulted, Retired
    purchase_date = Column(String)
    warranty_expiry = Column(String)

class AssetAssignment(Base):
    __tablename__ = "asset_assignments"
    id = Column(String, primary_key=True)
    asset_id = Column(String, ForeignKey("assets.id"))
    assigned_to_user_id = Column(String, ForeignKey("users.id"))
    branch_id = Column(String, ForeignKey("branches.id"))
    assigned_at = Column(DateTime, default=datetime.utcnow)
    returned_at = Column(DateTime, nullable=True)
    status = Column(String)

class AccessRequest(Base):
    __tablename__ = "access_requests"
    id = Column(String, primary_key=True)
    request_number = Column(String, unique=True)
    user_id = Column(String, ForeignKey("users.id"))
    application_name = Column(String, nullable=False)
    access_level = Column(String, nullable=False)
    reason = Column(Text)
    status = Column(String, default="Pending Approval")
    manager_approval_status = Column(String, default="Approved")
    it_approval_status = Column(String, default="Pending")
    granted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    action = Column(String, nullable=False)
    entity_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=False)
    details = Column(Text)
    ip_address = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class SLAPolicy(Base):
    __tablename__ = "sla_policies"
    id = Column(String, primary_key=True)
    priority_level = Column(String, unique=True, nullable=False) # P1, P2, P3, P4
    response_time_hours = Column(Integer, nullable=False)
    resolution_time_hours = Column(Integer, nullable=False)
    warning_threshold_percent = Column(Integer, default=80)
