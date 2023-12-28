import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TasteAnalysisChart = ({ oneInfo }) => {
  // 별점 분포 계산
  const calculateRatingDistribution = (oneInfo) => {
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (oneInfo) {
      oneInfo.forEach((one) => {
        const stars = parseInt(one.stars, 10);
        distribution[stars]++;
      });
    }

    return Object.keys(distribution).map((key) => ({
      rating: `${key}점`,
      count: distribution[key],
    }));
  };

  // Format tick values to display integers
  const formatYAxisTick = (value) => {
    return Math.round(value);
  };

  // 별점 분포 데이터
  const ratingDistributionData = calculateRatingDistribution(oneInfo);

  // Calculate average rating, total count, and most frequent rating
  const totalCount = oneInfo ? oneInfo.length : 0;
  const totalStars = oneInfo
    ? oneInfo.reduce((sum, one) => sum + parseInt(one.stars, 10), 0)
    : 0;
  const averageRating = totalCount > 0 ? totalStars / totalCount : 0;

  // Find the most frequent rating
  const mostFrequentRating = ratingDistributionData.reduce(
    (max, item) => (item.count > max.count ? item : max),
    { count: 0 }
  );

  const categorizeUser = (averageRating) => {
    if (averageRating >= 0.1 && averageRating < 1) {
      return {
        message: "당신은 비판적 평가자입니다.",
      };
    } else if (averageRating >= 1 && averageRating < 2) {
      return {
        message: "당신은 객관적 중립가입니다.",
      };
    } else if (averageRating >= 2 && averageRating < 3) {
      return {
        message: "당신은 미적 감각을 가진 감상가입니다.",
      };
    } else if (averageRating >= 3 && averageRating < 4) {
      return {
        message: "당신은 예술적 감수성이 풍부한 사람입니다.",
      };
    } else if (averageRating >= 4 && averageRating <= 5) {
      return {
        message: "당신은 마에스트로 평가자입니다.",
      };
    } else {
      return {
        message: "아직 평가가 없군요, 더 많은 전시를 평가해주세요",
      };
    }
  };
  const { message } = categorizeUser(averageRating.toFixed(2));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "#DB908A",
          fontSize: "30px",
          paddingBottom: "20px",
        }}
      >
        별점 분석 도표
      </h1>
      <ResponsiveContainer width="70%" height={300}>
        <BarChart
          data={ratingDistributionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis tickCount={5} tickFormatter={formatYAxisTick} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#872323
"
          />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          color: "#DB908A",
          fontSize: "20px",
          paddingTop: "40px",
        }}
      >
        <p>별점 평균: {averageRating.toFixed(2)}</p>
        <p>별점 갯수: {totalCount}</p>
        <p>가장 많이 준 별점: {mostFrequentRating.rating}</p>
        <h2>
          <span style={{ marginRight: "10px" }}>➔</span> {message}
        </h2>
      </div>
    </div>
  );
};

export default TasteAnalysisChart;
