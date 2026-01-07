import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState('전체');
  const [selectedPosition, setSelectedPosition] = useState('전체');

  const monthlyData = [
    { month: '1월', 지원자: 120, 서류통과: 45, 면접완료: 20, 최종합격: 8 },
    { month: '2월', 지원자: 98, 서류통과: 38, 면접완료: 15, 최종합격: 5 },
    { month: '3월', 지원자: 145, 서류통과: 52, 면접완료: 28, 최종합격: 12 },
    { month: '4월', 지원자: 167, 서류통과: 61, 면접완료: 32, 최종합격: 14 },
    { month: '5월', 지원자: 134, 서류통과: 48, 면접완료: 22, 최종합격: 9 },
    { month: '6월', 지원자: 189, 서류통과: 72, 면접완료: 38, 최종합격: 16 },
  ];

  const positionData = [
    { name: '개발직', value: 245, color: '#3b82f6' },
    { name: '기획직', value: 156, color: '#10b981' },
    { name: '디자인직', value: 89, color: '#f59e0b' },
    { name: '영업직', value: 178, color: '#ef4444' },
    { name: '인사직', value: 67, color: '#8b5cf6' },
  ];

  const assessmentData = [
    { name: 'AI 인성검사', 완료: 89, 미완료: 11 },
    { name: 'PSG 게임', 완료: 76, 미완료: 24 },
    { name: '직무적성', 완료: 92, 미완료: 8 },
    { name: '코딩테스트', 완료: 68, 미완료: 32 },
  ];

  const totalApplicants = monthlyData.reduce((sum, m) => sum + m.지원자, 0);
  const totalHired = monthlyData.reduce((sum, m) => sum + m.최종합격, 0);
  const avgPassRate = ((totalHired / totalApplicants) * 100).toFixed(1);

  const StatCard = ({ title, value, subtitle, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">📊 채용 현황 대시보드</h1>
        <p className="text-gray-500 mt-1">2024년 상반기 채용 데이터 요약</p>
      </div>

      <div className="flex gap-4 mb-6">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="전체">전체 기간</option>
          {monthlyData.map(m => <option key={m.month} value={m.month}>{m.month}</option>)}
        </select>
        <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="전체">전체 직군</option>
          {positionData.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="총 지원자" value={totalApplicants.toLocaleString()} subtitle="상반기 누적" color="text-blue-600" />
        <StatCard title="최종 합격자" value={totalHired} subtitle={`합격률 ${avgPassRate}%`} color="text-green-600" />
        <StatCard title="진행중 전형" value="23" subtitle="면접 대기 포함" color="text-orange-500" />
        <StatCard title="평균 소요일" value="18.5일" subtitle="지원→최종합격" color="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">월별 채용 현황</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="지원자" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="서류통과" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="최종합격" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">직군별 지원자 분포</h2>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie data={positionData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value">
                  {positionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {positionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-800">{item.value}명</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">평가도구별 완료율</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {assessmentData.map((item) => (
            <div key={item.name} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="none"
                    strokeDasharray={`${item.완료 * 2.51} 251`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
                  {item.완료}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-400 text-sm mt-8">
        💡 이 대시보드는 샘플 데이터입니다.
      </p>
    </div>
  );
}
