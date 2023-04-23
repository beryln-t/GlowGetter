import IntroMsg from "./IntroMsg";
import AnalyserButtons from "./AnalyserButtons";

export default function SkinAnalyser() {
  return (
    <div className="hero min-h-screen bg-stone-50">
      <div className="hero-content flex-col items-center justify-start">
        <IntroMsg />
        <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
          <div className="card-body text-slate-800">
            <div className="form-control">
              <label className="label text-lg	font-semibold	">
                Do you like ice cream?
              </label>
              <div className="radio-options flex flex-col gap-2">
                <label className="radio-option cursor-pointer flex items-center content-center gap-1">
                  <input
                    type="radio"
                    name="radio-ice-cream"
                    id="radio-ice-cream-yes"
                    className="radio radio-xs checked:bg-primary"
                    checked
                  />
                  <span className="radio-option-text ">Yes</span>
                </label>
                <label className="radio-option cursor-pointer flex items-center content-center gap-1">
                  <input
                    type="radio"
                    name="radio-ice-cream"
                    id="radio-ice-cream-no"
                    className="radio radio-xs checked:bg-primary"
                  />
                  <span className="radio-option-text">No</span>
                </label>
              </div>
            </div>

            <div className="form-control mt-4 flex flex-row gap-2">
              <button className="btn btn-primary btn-sm w-min w-24">
                Submit
              </button>
              <button className="btn btn-secondary btn-sm w-min w-24">
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
