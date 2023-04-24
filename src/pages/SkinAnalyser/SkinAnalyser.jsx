import React, { useState, useEffect } from "react";
import IntroMsg from "./IntroMsg";

export default function SkinAnalyser({ user }) {
  const [questions, setQuestions] = useState([]);
  const [responseMap, setResponseMap] = useState({});

  const getQuestions = async () => {
    return await fetch("/api/analyser")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error(error);
      });
  };

  const getResponses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/analyser/response/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  async function initalizeAnalyzer() {
    const questionRes = await getQuestions();
    const questionsArr = questionRes.map((item) => ({
      qnId: item._id,
      question: item.question,
    }));
    setQuestions(questionsArr);
    const responseRes = await getResponses();
    console.log("response res", responseRes);
    const responseMap = responseRes.analyserResponse.reduce(
      (prev, response) => ({
        ...prev,
        [response.question]: response.answer,
      }),
      {}
    );
    setResponseMap(responseMap);
  }

  useEffect(() => {
    // If user is null, there will not be response
    if (user) {
      initalizeAnalyzer();
    }
  }, [user]);

  const handleRadioChange = (e, qnId) => {
    const answer = Number(e.target.value);
    const newResponse = {
      question: qnId,
      answer,
    };
    // const newResponses = responses.filter((r) => r.question !== qnId);
    // setResponses([...newResponses, newResponse]);

    console.log("qnid ", qnId);
    console.log("answer ", answer);
    console.log("radio change responsemap ", responseMap);
    setResponseMap((prevState) => ({
      ...prevState,
      [qnId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("response", responses);
    const responses = Object.keys(responseMap).map((id) => ({
      question: id,
      answer: responseMap[id],
    }));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/analyser/response/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(responses),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("responseMap ", responseMap);
  console.log("questions ", questions);

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
                      {`Qn ${index + 1}. ${question.question}`}
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
                        value={1}
                        // defaultChecked={responseMap[question.qnId] === 1}
                        checked={responseMap[question.qnId] === 1}
                        onChange={(e) => handleRadioChange(e, question.qnId)}
                      />
                      <span className="radio-option-text ">Yes</span>
                    </label>
                    <label className="radio-option cursor-pointer flex items-center content-center gap-1">
                      <input
                        type="radio"
                        name={question.qnId}
                        id={`${question.qnId}-no`}
                        className="radio radio-xs checked:bg-primary"
                        value={0}
                        // defaultChecked={responseMap[question.qnId] === 0}
                        checked={responseMap[question.qnId] === 0}
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
