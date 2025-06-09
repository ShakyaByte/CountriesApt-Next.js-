'use client';
import dynamic from 'next/dynamic';

// Dynamically import Chart with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-[350px] text-white">Loading chart...</div>
});

    const CountriesCharts = () => {
    const countries = [
        { name: 'USA', population: 331, area: 9834, gdp: 21427 },
        { name: 'China', population: 1439, area: 9597, gdp: 14342 },
        { name: 'India', population: 1380, area: 3287, gdp: 2875 },
        { name: 'Brazil', population: 213, area: 8516, gdp: 1609 },
        { name: 'Russia', population: 146, area: 17098, gdp: 1483 },
        { name: 'Japan', population: 126, area: 378, gdp: 4941 }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-8">
        
        {/* 1. Gradient Bar Chart */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
                plotOptions: { bar: { borderRadius: 8, horizontal: true } },
                xaxis: { 
                categories: countries.map(c => c.name),
                labels: { style: { colors: '#fff' } }
                },
                yaxis: { labels: { style: { colors: '#fff' } } },
                grid: { show: false },
                colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
                title: { text: 'Population (Millions)', style: { color: '#fff', fontSize: '18px' } }
            }}
            series={[{ name: 'Population', data: countries.map(c => c.population) }]}
            type="bar"
            height={350}
            />
        </div>

        {/* 2. Neon Column Chart */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-400 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
                plotOptions: { bar: { borderRadius: 8, columnWidth: '60%' } },
                xaxis: { 
                categories: countries.map(c => c.name),
                labels: { style: { colors: '#fff' } }
                },
                yaxis: { labels: { style: { colors: '#fff' } } },
                grid: { show: false },
                colors: ['#FF1744', '#FF9100', '#FFEA00', '#76FF03', '#00E5FF', '#E91E63'],
                title: { text: 'Area (1000 km²)', style: { color: '#fff', fontSize: '18px' } }
            }}
            series={[{ name: 'Area', data: countries.map(c => c.area) }]}
            type="bar"
            height={350}
            />
        </div>

        {/* 3. Vibrant Pie Chart */}
        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'pie', background: 'transparent' },
                labels: ['Americas', 'Asia', 'Europe'],
                colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
                legend: { labels: { colors: '#fff' } },
                title: { text: 'Regions', style: { color: '#fff', fontSize: '18px' } }
            }}
            series={[2, 3, 1]}
            type="pie"
            height={350}
            />
        </div>

        {/* 4. Glowing Donut Chart */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'donut', background: 'transparent' },
                labels: countries.slice(0, 5).map(c => c.name),
                colors: ['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD'],
                legend: { labels: { colors: '#fff' } },
                title: { text: 'GDP (Trillion $)', style: { color: '#fff', fontSize: '18px' } },
                plotOptions: {
                pie: { donut: { size: '65%' } }
                }
            }}
            series={countries.slice(0, 5).map(c => c.gdp)}
            type="donut"
            height={350}
            />
        </div>

        {/* 5. Aurora Area Chart */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
                xaxis: { 
                categories: ['2018', '2019', '2020', '2021', '2022'],
                labels: { style: { colors: '#fff' } }
                },
                yaxis: { labels: { style: { colors: '#fff' } } },
                grid: { borderColor: 'rgba(255,255,255,0.1)' },
                colors: ['#00F5FF'],
                title: { text: 'Population Growth', style: { color: '#fff', fontSize: '18px' } },
                fill: {
                type: 'gradient',
                gradient: { shadeIntensity: 1, opacityFrom: 0.8, opacityTo: 0.1 }
                },
                stroke: { width: 3 }
            }}
            series={[{ name: 'Population', data: [7600, 7700, 7800, 7850, 7900] }]}
            type="area"
            height={350}
            />
        </div>

        {/* 6. Electric Line Chart */}
        <div className="bg-gradient-to-br from-pink-500 to-violet-500 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
                xaxis: { 
                categories: countries.map(c => c.name),
                labels: { style: { colors: '#fff' } }
                },
                yaxis: { labels: { style: { colors: '#fff' } } },
                grid: { borderColor: 'rgba(255,255,255,0.1)' },
                colors: ['#00FF41'],
                title: { text: 'GDP Comparison', style: { color: '#fff', fontSize: '18px' } },
                stroke: { width: 4, curve: 'smooth' },
                markers: { size: 6, colors: ['#FFD700'] }
            }}
            series={[{ name: 'GDP', data: countries.map(c => c.gdp) }]}
            type="line"
            height={350}
            />
        </div>

        {/* 7. Cosmic Radar Chart */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'radar', background: 'transparent' },
                xaxis: { categories: ['Population', 'Area', 'GDP'] },
                colors: ['#FF1493', '#00FFFF'],
                title: { text: 'USA vs China', style: { color: '#fff', fontSize: '18px' } },
                yaxis: { labels: { style: { colors: '#fff' } } },
                legend: { labels: { colors: '#fff' } }
            }}
            series={[
                { name: 'USA', data: [331, 98, 214] },
                { name: 'China', data: [1439, 96, 143] }
            ]}
            type="radar"
            height={350}
            />
        </div>

        {/* 8. Fire Heatmap */}
        <div className="bg-gradient-to-br from-red-600 to-orange-600 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'heatmap', background: 'transparent' },
                colors: ['#FF4500'],
                title: { text: 'Regional Heatmap', style: { color: '#fff', fontSize: '18px' } },
                plotOptions: {
                heatmap: {
                    colorScale: {
                    ranges: [
                        { from: 0, to: 2, color: '#FFB347' },
                        { from: 3, to: 4, color: '#FF6347' },
                        { from: 5, to: 6, color: '#DC143C' }
                    ]
                    }
                }
                }
            }}
            series={[
                { name: 'Americas', data: [{ x: 'Countries', y: 2 }] },
                { name: 'Asia', data: [{ x: 'Countries', y: 3 }] },
                { name: 'Europe', data: [{ x: 'Countries', y: 1 }] }
            ]}
            type="heatmap"
            height={350}
            />
        </div>

        {/* 9. Rainbow Mixed Chart */}
        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
                xaxis: { 
                categories: countries.slice(0, 4).map(c => c.name),
                labels: { style: { colors: '#fff' } }
                },
                yaxis: [
                { title: { text: 'Population', style: { color: '#fff' } }, labels: { style: { colors: '#fff' } } },
                { opposite: true, title: { text: 'GDP', style: { color: '#fff' } }, labels: { style: { colors: '#fff' } } }
                ],
                colors: ['#FF69B4', '#00FFFF'],
                title: { text: 'Population vs GDP', style: { color: '#fff', fontSize: '18px' } },
                stroke: { width: [0, 4] },
                legend: { labels: { colors: '#fff' } }
            }}
            series={[
                { name: 'Population', type: 'column', data: countries.slice(0, 4).map(c => c.population) },
                { name: 'GDP', type: 'line', data: countries.slice(0, 4).map(c => c.gdp) }
            ]}
            type="line"
            height={350}
            />
        </div>

        {/* 10. Neon Bubble Chart */}
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 rounded-3xl shadow-2xl">
            <Chart
            options={{
                chart: { type: 'bubble', background: 'transparent', toolbar: { show: false } },
                xaxis: { 
                title: { text: 'Population', style: { color: '#fff' } },
                labels: { style: { colors: '#fff' } }
                },
                yaxis: { 
                title: { text: 'Area', style: { color: '#fff' } },
                labels: { style: { colors: '#fff' } }
                },
                colors: ['#00FF7F'],
                title: { text: 'Population vs Area', style: { color: '#fff', fontSize: '18px' } },
                grid: { borderColor: 'rgba(255,255,255,0.1)' }
            }}
            series={[{
                name: 'Countries',
                data: countries.map(c => [c.population, c.area, c.gdp/100])
            }]}
            type="bubble"
            height={350}
            />
        </div>

        </div>
    );
    };

    export default CountriesCharts;