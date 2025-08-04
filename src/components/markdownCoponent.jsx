//     // import React from 'react';
// import ReactMarkdown from 'react-markdown';

// const SentimentMarkdown = ({ response }) => {
//     return (
//         <div className="prose max-w-none">
//             <ReactMarkdown>{response}</ReactMarkdown>
//         </div>
//     );
// };

// export default SentimentMarkdown;



import React from 'react';
import ReactMarkdown from 'react-markdown';

const SentimentMarkdown = ({ response }) => {
    if (!response) return null;

    const markdown = `
### 🔍 Sentiment Classification
**Overall Sentiment:** ${response.overall_sentiment}

### 📊 Score Breakdown
// check if float values are floa
- Negative (LABEL_0): ${response.score_breakdown.LABEL_0}
- Neutral (LABEL_1): ${response.score_breakdown.LABEL_1}
- Positive (LABEL_2): ${response.score_breakdown.LABEL_2}

### 📝 Summary
${response.summary}

### ⚠️ Potential Misinformation or Harm
**Flagged:** ${response.flagged ? "Yes" : "No"}  
**Likely to be False:** ${response.truth_likelihood}  
**Reason:** ${response.reason}
`;

    return (
        <div className="prose max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};

export default SentimentMarkdown;


