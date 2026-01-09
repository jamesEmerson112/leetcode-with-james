import React from "react";

function Slides({ slides }) {
    const [idx, setIdx] = React.useState(0);
    const [isFirstClick, setIsFirstClick] = React.useState(true);

    const handleRestart = () => {
        setIdx(0);
    }

    const handlePrev = () => {
        if (idx > 0) {
            setIdx(idx - 1);
        }
    }

    const handleNext = () => {
        if (idx < slides.length - 1) {
            setIdx(idx + 1);
        }
    }

  return (
    <div>
      <div id="navigation" className="text-center">
        <button data-testid="button-restart" className="small outlined"
        onClick={handleRestart}
        disabled={idx === 0}>
          Restart
        </button>
        <button data-testid="button-prev" className="small"
        onClick={handlePrev}
        disabled={idx === 0}>
          Prev
        </button>
        {/* if idx === slides.length - 1, disable the button */}
        <button data-testid="button-next" className="small" onClick={handleNext} 
        disabled={idx === slides.length - 1}>
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        {/* display the slides.title */}
        <h1 data-testid="title">{slides[idx].title}</h1>
        <p data-testid="text">{slides[idx].text}</p>
      </div>
    </div>
  );
}

export default Slides;
