import Graph from "../modules/stats-modules/Graph";

const Stats = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-4xl px-10 -mt-20">
        <Graph />
      </div>
    </div>
  );
};

export default Stats;
