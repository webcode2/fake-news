import React from 'react';
import ReactMarkdown from 'react-markdown';

const SentimentMarkdown = ({ response }) => {
    if (!response) return null;

    // Use the correct property names from the JSON output:
    // response.sentiment_classification (instead of overall_sentiment)
    // response.reason_misinformation_harmful (instead of reason)
    // response.score_breakdown.LABEL_X_Name (e.g., LABEL_0_Negative)

    const markdown = `
### 🔍 Sentiment Classification

**Overall Sentiment:** ${response.sentiment_classification}


${
    // Commented out the lines that were displaying 0s
    // - Negative (LABEL_0): ${response.score_breakdown.LABEL_0_Negative || 0}
    // - Neutral (LABEL_1): ${response.score_breakdown.LABEL_1_Neutral || 0}
    // - Positive (LABEL_2): ${response.score_breakdown.LABEL_2_Positive || 0}

    // Fix those objects displays by directly showing the object values if available
    // Check if the property exists and use a fallback (like "N/A" for the unparseable case)
        `

    `
}

### 📝 Summary
${response.summary}

### ⚠️ Potential Misinformation or Harm
**Flagged:** ${response.flagged ? "Yes" : "No"} \n
**Likely to be False:** ${response.truth_likelihood} \n
**Reason:** ${response.reason}
`;

    return (
        <div className="prose max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};

export default SentimentMarkdown;