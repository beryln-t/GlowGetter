import React, { useState, useEffect } from "react";
import IntroMsg from "./IntroMsg";
import AnalyserButtons from "./AnalyserButtons";

export default function SkinAnalyser() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("/api/analyser")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.map((item) => ({
            qnId: item._id,
            question: item.question,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRadioChange = (e, qnId) => {
    const newResponse = {
      question: qnId,
      answer: e.target.value,
    };
    const newResponses = responses.filter((r) => r.question !== qnId);
    setResponses([...newResponses, newResponse]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/analyser/response/${user._id}}", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responses),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-stone-50">
      <div className="hero-content flex-col items-center justify-center">
        <IntroMsg />
        <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
          <div className="card-body text-slate-800">
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
                <div key={question.qnId} className="form-control">
                  <div className="flex flex-row items-center">
                    <label className="label text-lg	font-semibold	">
                      {`Qn ${index + 1}. ${question}`}
                    </label>
                    <span className="text-red-500">*</span>
                  </div>

                  <div className="radio-options flex flex-col gap-2">
                    <label className="radio-option cursor-pointer flex items-center content-center gap-1">
                      <input
                        type="radio"
                        name={question.qnId}
                        id={`${question.qnId}-yes`}
                        className="radio radio-xs checked:bg-primary"
                        value="1"
                        onChange={(e) => handleRadioChange(e, question.qnId)}
                      />
                      <span className="radio-option-text ">Yes</span>
                    </label>
                    <label className="radio-option cursor-pointer flex items-center content-center gap-1">
                      <input
                        type="radio"
                        name={question.qnId}
                        id={`{question.qnId}-no`}
                        className="radio radio-xs checked:bg-primary"
                        value="0"
                        onChange={(e) => handleRadioChange(e, question.qnId)}
                      />
                      <span className="radio-option-text">No</span>
                    </label>
                  </div>
                </div>
              ))}

              <div className="form-control mt-4 flex flex-row gap-2">
                <button className="btn btn-primary btn-sm w-min w-24">
                  Submit
                </button>
                <button className="btn btn-secondary btn-sm w-min w-24">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
