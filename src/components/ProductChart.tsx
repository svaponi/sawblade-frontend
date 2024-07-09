import {CalendarIcon} from '@heroicons/react/24/outline';
import {aggregateCategories} from '@/app/(protected)/dashboard/products/actions';
import {CategoryCount} from '@/domain/products'; // This component is representational only.

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function ProductChart() {
  const categoryCounts = await aggregateCategories();
  console.log(categoryCounts);

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(categoryCounts);

  if (!categoryCounts || categoryCounts.length === 0) {
    return <p className="text-muted-foreground mt-4">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Products by category</h2>
      <div className="bg-muted rounded-xl p-4">
        <div className="">
          {/* y-axis */}

          <div
            className="text-muted-foreground mb-6 flex justify-between text-sm"
            style={{ height: `${chartHeight}px` }}
          >
            <div className="text-muted-foreground mb-6 flex h-full flex-col justify-between text-sm">
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>
            {categoryCounts.map((month) => (
              <div
                key={month.category}
                className="flex w-2 flex-col-reverse items-center gap-2"
              >
                {/* bars */}
                <div
                  className="w-4 rounded-md bg-blue-300"
                  style={{
                    height: `${(chartHeight / topLabel) * month.count}px`,
                  }}
                ></div>
                {/* x-axis */}
                <p className="text-muted-foreground -rotate-45 text-sm">
                  {month.category}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="text-muted-foreground h-5 w-5" />
          <h3 className="text-muted-foreground ml-2 text-sm">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}

export const generateYAxis = (collection: CategoryCount[]) => {
  const yAxisLabels = [];
  const topLabel = Math.max(...collection.map((item) => item.count));
  for (let i = topLabel; i >= 0; i -= 5) {
    yAxisLabels.push(`${i}`);
  }
  return { yAxisLabels, topLabel };
};
