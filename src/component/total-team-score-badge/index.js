import React from 'react'
import './total-team-score-badge.css'

const TotalTeamScoreBadge = ({
    title = 'Total Team Score',
    value = 0,
    badgeColor='#c05a5a'
}) => (
<div className="TotalTeamScoreBadge" style={{ backgroundColor: badgeColor }}>
    <h3 id="total-score-title">{ title }</h3>
    <input
        className="TotalTeamScoreBadge-input"
        type="text"
        aria-labelledby="#total-score-title"
        value={ value }
        style={{ color: badgeColor }}
        readOnly />
</div>)

export default TotalTeamScoreBadge
