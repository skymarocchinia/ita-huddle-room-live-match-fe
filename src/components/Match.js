import { useEffect } from "react";
import { useMachine } from "@xstate/react";

import matchMachine from "../machines";
import FootballAnimation from "../animation/page/FootballAnimation/FootballAnimation";

const Match = ({ matchId }) => {
  const [state] = useMachine(() =>
    matchMachine.withContext({ matchId, events: [] })
  );

  return (
    <div className="container-page">
      <FootballAnimation />
    </div>
  );
};

export default Match;
