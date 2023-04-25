import { useState, useEffect } from "react";

export default function SkintypeResult({ user }) {
  const [skintype, setSkintype] = useState(user);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchSkintype = async () => {
      if (!user) {
        return; // exit early if user is null or undefined
      }
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `/api/skintypes/${user.skintype._id}/member/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        console.log("what is showing???", data);
        if (!response.ok) {
          throw new Error(data.error);
        }
        setSkintype(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSkintype();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!skintype) {
    return <div>no skintype</div>;
  }

  return (
    <div>
      <h1>Your Skintype Result</h1>
      <p>Type: {skintype.type}</p>
      <p>Message: {skintype.message}</p>
    </div>
  );
}
