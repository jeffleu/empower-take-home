import React, { useEffect, useState } from 'react';
// 3rd party libraries
import { PieChart } from '@mui/x-charts';
// Components
import CategoryIcon from '../common/CategoryIcon.tsx';
import Loading from '../common/Loading.tsx';
import Row from '../common/Row.tsx';
// Utils
import { getPieChartData } from '../../utils.ts';

const MonthlyReport = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pieChartData, setPieChartData] = useState<Array<{ label: string; value: number; }>>([]);
  const [categoryAmounts, setCategoryAmounts] = useState<Record<string, number | string>[]>([]);

  // Fetch pie chart data
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      const { pieChartData: pieChartResponse, spentPerCategory } = getPieChartData();

      const newCategoryAmounts: Record<string, number | string>[] = [];
      for (const category in spentPerCategory) {
        const amount = spentPerCategory[category];
        newCategoryAmounts.push({ name: category, amount });
      }
      setCategoryAmounts(newCategoryAmounts);

      setPieChartData(pieChartResponse);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="monthly-report-wrapper">
      <div className="monthly-report-header">
        <div className="monthly-report-header-text">
          Monthly Report
        </div>
      </div>

      {isLoading && (
        <Loading />
      )}

      {pieChartData.length > 0 && !isLoading && (
        <div className="pie-chart-wrapper">
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 35,
                outerRadius: 125,
                paddingAngle: 3,
                cornerRadius: 5,
                startAngle: 0,
                endAngle: 360,
                cx: 150,
                cy: 150,
              },
            ]}
            width={400}
            height={400}
          />
        </div>
      )}

      <div className="category-amounts">
        {categoryAmounts.map(category => {
          const percentage = pieChartData.find(data => data.label === category.name)?.value ?? 0;
          return (
            <Row
              amount={+category.amount}
              icon={<CategoryIcon category={category.name as string} />}
              key={category.name}
              primaryText={category.name as string}
              secondaryText={`${percentage}%`}
            />
          )
        })}
      </div>
    </div>
  );
};

export default MonthlyReport;
