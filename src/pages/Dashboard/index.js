import { useState } from "react";
import BarChart from "../../components/modules/BarChart";
import LineChart from "../../components/modules/LineChart";

const ProdsData = [
  {
    id: 1,
    year: "Lọc 505",
    userGain: 22,
    userLost: 823,
  },
  {
    id: 2,
    year: "Phân nền Academis",
    userGain: 69,
    userLost: 345,
  },
  {
    id: 3,
    year: "Đèn 220",
    userGain: 78,
    userLost: 555,
  },
  {
    id: 4,
    year: "Bon sai A",
    userGain: 100,
    userLost: 4555,
  },
];

export default function DashBoard() {
  const [prodsData] = useState({
    labels: ProdsData.map((data) => data.year),
    datasets: [
      {
        label: "Best - Selling Product",
        data: ProdsData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "green",
        borderWidth: 1,
      },
    ],
  });


  return (
    <div className="dash-board">
      <h1 className="title-page">DashBoard</h1>
      <div className="flex">
        <div className="dash-board-top">
          <BarChart chartData={prodsData} />
        </div>
        <div className="dash-board-sec">
          <LineChart chartData={prodsData} />
        </div>
      </div>
    </div>
  );
}
