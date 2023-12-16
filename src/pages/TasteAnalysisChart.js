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

  return (
    <div>
      <h5>별점 분석 도표</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={ratingDistributionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis tickCount={5} tickFormatter={formatYAxisTick} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div>
        <p>별점 평균: {averageRating.toFixed(2)}</p>
        <p>별점 갯수: {totalCount}</p>
        <p>가장 많이 준 별점: {mostFrequentRating.rating}</p>
      </div>
    </div>
  );
};

export default TasteAnalysisChart;
