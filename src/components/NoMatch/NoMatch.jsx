export default function NoMatch() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-error text-dark-grey">
        <div className="card-body flex flex-col justify-center items-center">
          <h2 className="card-title text-center">404. That's an error!</h2>
          <p className="text-center">
            The page you are looking for does not exist
          </p>
        </div>
      </div>
    </div>
  );
}
