"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { DollarSign, TrendingUp, Activity, Users } from 'lucide-react';

const EarningSummaryChart = () => {
  const [timeRange, setTimeRange] = useState('Monthly');
  
  // Generate fake data for the chart
  const monthlyData = [
    { month: 'Jan', new: 320, old: 280 },
    { month: 'Feb', new: 350, old: 320 },
    { month: 'Mar', new: 380, old: 340 },
    { month: 'Apr', new: 420, old: 380 },
    { month: 'May', new: 450, old: 400 },
    { month: 'Jun', new: 480, old: 420 },
    { month: 'Jul', new: 460, old: 430 },
    { month: 'Aug', new: 490, old: 450 },
    { month: 'Sep', new: 480, old: 440 },
    { month: 'Oct', new: 510, old: 460 },
    { month: 'Nov', new: 495, old: 470 },
    { month: 'Dec', new: 520, old: 480 },
  ];

  const dailyData = Array.from({ length: 30 }, (_, i) => ({
    month: `D${i + 1}`,
    new: Math.floor(Math.random() * 100) + 400,
    old: Math.floor(Math.random() * 100) + 350,
  }));

  const weeklyData = Array.from({ length: 12 }, (_, i) => ({
    month: `W${i + 1}`,
    new: Math.floor(Math.random() * 100) + 400,
    old: Math.floor(Math.random() * 100) + 350,
  }));

  const yearlyData = Array.from({ length: 12 }, (_, i) => ({
    month: 2013 + i,
    new: Math.floor(Math.random() * 2000) + 3000,
    old: Math.floor(Math.random() * 2000) + 2500,
  }));

  const getChartData = () => {
    switch(timeRange) {
      case 'Daily': return dailyData;
      case 'Weekly': return weeklyData;
      case 'Yearly': return yearlyData;
      default: return monthlyData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 p-3 rounded-lg border border-purple-500/30">
          <p className="text-white text-sm font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <div className=" p-4 ">
        {/* Main Dashboard Card */}
        <div className=" flex">
          <div className="bg-[#312B36] rounded-2xl p-4">
            <div className="flex gap-24">
              {/* Left Section */}
              <div className="flex flex-col justify-between ">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-white text-lg font-semibold">Dashboard</h2>
                  <p className="text-gray-400 text-xs">Overview of Latest Month</p>
                </div>
                
                {/* User Growth */}
                <div className="mb-6">
                  <p className="text-gray-400 text-xs mb-1">User Growth</p>
                  <p className="text-[#2BA849] text-2xl font-semibold">+15%</p>
                </div>
                
                {/* Plays vs. Bangs */}
                <div className="mb-6">
                  <p className="text-white text-2xl font-semibold">12,345</p>
                  <p className="text-gray-400 text-xs">Plays vs. Bangs</p>
                </div>
                
                {/* Summary Button */}
                <button className="px-4 py-3 border border-[#896E9C] rounded-full text-white text-xs hover:bg-[#896E9C]/20 transition-colors">
                  Last Month Summary
                </button>
              </div>
              
              {/* Right Section - Chart */}
              <div className="flex-1 min-w-[500px]">
                {/* Chart Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-6">
                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`text-xs transition-colors ${
                          timeRange === range ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#A141FE] rounded-full"></div>
                      <span className="text-gray-300 text-xs">New</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#245FE7] rounded-full"></div>
                      <span className="text-gray-300 text-xs">Old</span>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A141FE" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#A141FE" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorOld" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#245FE7" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#245FE7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="#E2E8F0" strokeOpacity={0.1} vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#CBD5E0', fontSize: 10, fontWeight: 700 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#CBD5E0', fontSize: 10, fontWeight: 700 }}
                        ticks={[0, 100, 200, 300, 400, 500]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="new"
                        stroke="#A141FE"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorNew)"
                      />
                      <Area
                        type="monotone"
                        dataKey="old"
                        stroke="#245FE7"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorOld)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Bottom Stats */}
            <div className="flex mt-6 -mx-6">
              {/* This Month Earning */}
              <div className="flex-1 px-16 py-4 border-t border-r border-[#896E9C] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#29232A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">This Month Earning</p>
                  <p className="text-white text-sm font-medium">$1689.53</p>
                </div>
              </div>
              
              {/* Total Earning */}
              <div className="flex-1 px-16 py-4 border-t border-[#896E9C] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#29232A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Total Earning</p>
                  <p className="text-white text-sm font-medium">$52,567.53</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side Cards */}
          <div className="flex flex-col gap-6 ml-6 w-full">
            {/* New/Old Toggle */}
           
            
            {/* Total Playlist Card */}
            <div className="bg-[#312B36] rounded-xl p-4 w-full">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-xs">Total Playlist</p>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-white text-3xl font-bold">12</p>
            </div>
            
            {/* Total Followers Card */}
            <div className="bg-[#312B36] rounded-xl p-4 w-full">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-xs">Total Followers</p>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-white text-3xl font-bold">58,320</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningSummaryChart;