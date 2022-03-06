import { useState, useEffect } from "react";

import { getStats } from "../api/index";

import Card from "react-bootstrap/Card";

function Overview() {
  const [statsData, setStatsData] = useState({});

  useEffect(() => {
    getStats().then((res) => {
      setStatsData(res);
    });
  }, []);

  return (
    <Card className="mb-2 custom-card overview">
      <Card.Body>
        <Card.Title> Overview </Card.Title>
        <Card.Text>
          <p>Total requests: {statsData.totalRequests}</p>
          <p>Duplicated requests removed: {statsData.duplicatesRemoved}</p>
          <p>Defected requests removed: {statsData.defected}</p>
          <p>Total requests after cleaning: {statsData.totalCleanedRequests}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Overview;
