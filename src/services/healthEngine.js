// Branch Health Score Calculation Engine for BankIT360

export function calculateBranchHealth(branch, tickets = [], incidents = [], assets = []) {
  const branchTickets = tickets.filter(t => t.branchId === branch.id);
  const branchIncidents = incidents.filter(i => i.branchId === branch.id && i.status !== 'Closed');
  const branchAssets = assets.filter(a => a.branchId === branch.id);

  const openP1Incidents = branchIncidents.filter(i => i.severity.includes('P1')).length;
  const slaBreachedTickets = branchTickets.filter(t => t.isSlaBreached && t.status !== 'Resolved' && t.status !== 'Closed').length;
  const failedAssets = branchAssets.filter(a => a.status === 'Faulted' || a.status === 'Under Maintenance').length;
  
  // Calculate recurring categories count at this branch
  const catCounts = {};
  branchTickets.forEach(t => {
    catCounts[t.category] = (catCounts[t.category] || 0) + 1;
  });
  const recurringPatterns = Object.values(catCounts).filter(c => c >= 2).length;

  // Deductions
  const p1Deduction = openP1Incidents * 18;
  const slaDeduction = slaBreachedTickets * 12;
  const assetDeduction = failedAssets * 6;
  const recurringDeduction = recurringPatterns * 8;

  const rawScore = 100 - p1Deduction - slaDeduction - assetDeduction - recurringDeduction;
  const healthScore = Math.max(15, Math.min(100, rawScore));

  let status = 'Healthy';
  let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  let glowEffect = 'glow-emerald';

  if (healthScore < 65) {
    status = 'Critical Risk';
    badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    glowEffect = 'glow-rose';
  } else if (healthScore < 85) {
    status = 'Moderate Risk';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    glowEffect = 'glow-amber';
  }

  return {
    branchId: branch.id,
    branchName: branch.name,
    healthScore,
    status,
    badgeColor,
    glowEffect,
    metrics: {
      activeTickets: branchTickets.filter(t => t.status !== 'Closed').length,
      openP1Incidents,
      slaBreachedTickets,
      failedAssets,
      recurringPatterns
    }
  };
}

/**
 * "Why?" Explanation Engine: Generates human-readable causal analysis for branch health scores.
 */
export function getBranchHealthExplanation(branch, healthData, tickets = [], incidents = [], assets = []) {
  const branchTickets = tickets.filter(t => t.branchId === branch.id);
  const branchIncidents = incidents.filter(i => i.branchId === branch.id && i.status !== 'Closed');
  const branchAssets = assets.filter(a => a.branchId === branch.id);

  // Category breakdown
  const categoryMap = {};
  branchTickets.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + 1;
  });

  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0] || ['General IT', 0];
  const failedAssetItems = branchAssets.filter(a => a.status === 'Faulted' || a.status === 'Under Maintenance');
  const slaBreachedItems = branchTickets.filter(t => t.isSlaBreached && t.status !== 'Closed');
  const p1Items = branchIncidents.filter(i => i.severity.includes('P1'));

  // Determine Primary Reason
  let primaryReason = 'All branch IT telemetry nominal and within baseline limits.';
  if (p1Items.length > 0) {
    primaryReason = `Critical ${p1Items[0].title || 'P1 Infrastructure Outage'} impacting branch teller operations`;
  } else if (topCategory[1] >= 4) {
    primaryReason = `Frequent ${topCategory[0]} incidents and connectivity degradation`;
  } else if (failedAssetItems.length > 0) {
    primaryReason = `Critical hardware failure on branch ${failedAssetItems[0].name} (${failedAssetItems[0].id})`;
  } else if (slaBreachedItems.length > 0) {
    primaryReason = `${slaBreachedItems.length} unresolved SLA breaches accumulating resolution delay penalty`;
  }

  // Contributing Factors
  const contributingFactors = [];
  if (topCategory[1] > 0) {
    contributingFactors.push({
      factor: `${topCategory[1]} ${topCategory[0]} Tickets Reported`,
      impact: `-${Math.min(25, topCategory[1] * 5)} pts`,
      severity: topCategory[1] >= 4 ? 'high' : 'medium'
    });
  }
  if (failedAssetItems.length > 0) {
    const failedNames = failedAssetItems.map(a => `${a.name} (${a.id})`).join(', ');
    contributingFactors.push({
      factor: `Hardware Failure: ${failedNames}`,
      impact: `-${failedAssetItems.length * 6} pts`,
      severity: 'high'
    });
  }
  if (slaBreachedItems.length > 0) {
    contributingFactors.push({
      factor: `${slaBreachedItems.length} Active SLA Breach(es)`,
      impact: `-${slaBreachedItems.length * 12} pts`,
      severity: 'critical'
    });
  }
  if (p1Items.length > 0) {
    contributingFactors.push({
      factor: `${p1Items.length} Unresolved P1 Outage Incident(s)`,
      impact: `-${p1Items.length * 18} pts`,
      severity: 'critical'
    });
  }
  if (healthData.metrics.recurringPatterns > 0) {
    contributingFactors.push({
      factor: `${healthData.metrics.recurringPatterns} Recurring failure pattern(s) detected`,
      impact: `-${healthData.metrics.recurringPatterns * 8} pts`,
      severity: 'medium'
    });
  }

  if (contributingFactors.length === 0) {
    contributingFactors.push({
      factor: '99.8% ATM & Terminal network uptime',
      impact: '+0 deductions',
      severity: 'nominal'
    });
  }

  // Actionable Recommended Remediation
  const recommendedActions = [];
  if (failedAssetItems.length > 0) {
    recommendedActions.push(`Dispatch L2 field engineer to replace faulty ${failedAssetItems[0].name}`);
  }
  if (slaBreachedItems.length > 0) {
    recommendedActions.push(`Escalate ${slaBreachedItems[0].id} to Senior Infrastructure Team immediately`);
  }
  if (topCategory[0] === 'Network' && topCategory[1] >= 3) {
    recommendedActions.push(`Run automated switch loop diagnostic & failover to secondary LTE 4G gateway`);
  }
  if (recommendedActions.length === 0) {
    recommendedActions.push('Maintain standard preventive maintenance schedule');
  }

  return {
    branchId: branch.id,
    branchName: branch.name,
    healthScore: healthData.healthScore,
    status: healthData.status,
    primaryReason,
    contributingFactors,
    recommendedActions,
    calculationDetails: {
      baseScore: 100,
      totalDeductions: 100 - healthData.healthScore
    }
  };
}

