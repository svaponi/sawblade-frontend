import {CalendarIcon} from '@heroicons/react/24/outline';
import {aggregateCategories} from '@/app/(protected)/dashboard/products/actions';
import {CategoryCount} from '@/domain/products';

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
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Products by category</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="">
          {/* y-axis */}

          <div
            className="mb-6 flex justify-between text-sm text-gray-400"
            style={{ height: `${chartHeight}px` }}
          >
            <div className="mb-6 flex flex-col justify-between text-sm text-gray-400 h-full">
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
                <p className="-rotate-45 text-sm text-gray-400 ">
                  {month.category}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
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
