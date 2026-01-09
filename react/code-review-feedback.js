import React from "react";

const FeedbackSystem = () => {
    const categories = [
        "Readability",
        "Performance",
        "Security",
        "Documentation",
        "Testing"
    ];
    const [votes, setVotes] = React.useState(
        categories.map(() => ({ upvotes: 0, downvotes: 0 }))
    );

    const handleUpvote = (index) => {
        const newVotes = [...votes];
        newVotes[index].upvotes += 1;
        setVotes(newVotes);
    }


    const handleDownvote = (index) => {
        const newVotes = [...votes];
        newVotes[index].downvotes += 1;
        setVotes(newVotes);
    }
    // instead of only one feedback category, we will implement four more categories
    // Readability, Performance, Security, Documentation, Testing
    // each category will have its own upvote and downvote buttons
    // and each category should be dislpayed in a flexible card layout
    // instead of displaying vertically
  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        <div className="pa-10 w-300 card">
          <h2>Readability</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button className="py-10 px-15" data-testid="upvote-btn-0" onClick={() => handleUpvote(0)}>
              👍 Upvote
            </button>
            <button className="py-10 px-15 danger" data-testid="downvote-btn-0" onClick={() => handleDownvote(0)}>
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-0">
            Upvotes: <strong>{votes[0].upvotes}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-0">
            Downvotes: <strong>{votes[0].downvotes}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Performance</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button className="py-10 px-15" data-testid="upvote-btn-1" onClick={() => handleUpvote(1)}>
              👍 Upvote
            </button>
            <button className="py-10 px-15 danger" data-testid="downvote-btn-1" onClick={() => handleDownvote(1)}>
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-1">
            Upvotes: <strong>{votes[1].upvotes}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-1">
            Downvotes: <strong>{votes[1].downvotes}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Security</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button className="py-10 px-15" data-testid="upvote-btn-2" onClick={() => handleUpvote(2)}>
              👍 Upvote
            </button>
            <button className="py-10 px-15 danger" data-testid="downvote-btn-2" onClick={() => handleDownvote(2)}>
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-2">
            Upvotes: <strong>{votes[2].upvotes}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-2">
            Downvotes: <strong>{votes[2].downvotes}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Documentation</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button className="py-10 px-15" data-testid="upvote-btn-3" onClick={() => handleUpvote(3)}>
              👍 Upvote
            </button>
            <button className="py-10 px-15 danger" data-testid="downvote-btn-3" onClick={() => handleDownvote(3)}>
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-3">
            Upvotes: <strong>{votes[3].upvotes}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-3">
            Downvotes: <strong>{votes[3].downvotes}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Testing</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button className="py-10 px-15" data-testid="upvote-btn-4" onClick={() => handleUpvote(4)}>
              👍 Upvote
            </button>
            <button className="py-10 px-15 danger" data-testid="downvote-btn-4" onClick={() => handleDownvote(4)}>
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-4">
            Upvotes: <strong>{votes[4].upvotes}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-4">
            Downvotes: <strong>{votes[4].downvotes}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSystem;
