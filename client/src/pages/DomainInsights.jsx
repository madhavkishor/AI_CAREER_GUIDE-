import { AlertCircle, Award, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analyzeResume } from "../api/resumeApi";
import Loader from "../components/Loader";
import NoJobs from "../components/NoJobs";
import NoInsights from "../components/NoInsights";
import { useResume } from "../context/ResumeContext";

const DomainInsights = () => {
  const { resumeText } = useResume();
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resumeText) {
      setLoading(false);
      return;
    }

    const fetchDomains = async () => {
      try {
        const insights = await analyzeResume(resumeText);
        console.log("Backend Response:", insights);
        const dataArray = insights.analyzeResume || [];
        setDomains(dataArray);
      } catch (err) {
        console.error(err);
        setDomains([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [resumeText]);

  if (!resumeText) return <NoInsights />;
  if (loading) return <Loader />;
  if (domains.length === 0)
    return (
      <div className="pt-6 px-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-700">
          No skill domains found in your resume.
        </p>
      </div>
    );

  // Calculate ONLY real metrics from actual backend data
  const totalSkills = domains.reduce((sum, d) => sum + d.count, 0);

  // Get ALL unique skills from the actual data
  const uniqueSkillsSet = new Set();
  domains.forEach(({ skills }) =>
    skills.forEach((skill) => uniqueSkillsSet.add(skill))
  );
  const uniqueSkillsCount = uniqueSkillsSet.size;

  const avgSkillsPerDomain = (totalSkills / domains.length).toFixed(1);

  // Find top domain based on actual count
  const topDomain = domains.reduce(
    (max, d) => (d.count > max.count ? d : max),
    domains[0]
  );

  // Calculate skill diversity score based on REAL data
  const diversityScore = Math.min(
    100,
    ((uniqueSkillsCount / totalSkills) * 100).toFixed(0)
  );

  // Sort domains by actual count
  const sortedDomains = [...domains].sort((a, b) => b.count - a.count);
  const strongDomains = sortedDomains.slice(
    0,
    Math.min(3, sortedDomains.length)
  );
  const weakDomains = sortedDomains.slice(-Math.min(2, sortedDomains.length));

  // Calculate REAL skill frequency across domains
  const skillCounts = {};
  domains.forEach(({ skills }) => {
    skills.forEach((skill) => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  // All skills sorted by actual frequency
  const allSkillsData = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([skill, count]) => ({ skill, count }));

  // Only skills that ACTUALLY appear in 2+ domains
  const crossDomainSkills = allSkillsData.filter((s) => s.count >= 2);

  // Real frequency distribution
  const frequencyDistribution = {};
  allSkillsData.forEach(({ count }) => {
    frequencyDistribution[count] = (frequencyDistribution[count] || 0) + 1;
  });

  const frequencyData = Object.entries(frequencyDistribution)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([frequency, skillCount]) => ({
      frequency: `${frequency}x`,
      skillCount,
      numericFreq: Number(frequency),
    }));

  // Real domain balance
  const domainBalance = domains.map((d) => ({
    domain: d.domain.length > 15 ? d.domain.substring(0, 15) + "..." : d.domain,
    fullDomain: d.domain,
    skills: d.count,
    percentage: parseFloat(((d.count / totalSkills) * 100).toFixed(1)),
  }));

  // Colors
  const COLORS = [
    "#4f46e5",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  const CustomSkillTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">
            {payload[0].payload.skill}
          </p>
          <p className="text-sm text-gray-600">
            Appears in{" "}
            <span className="font-bold text-indigo-600">
              {payload[0].value}
            </span>{" "}
            domain(s)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-8 pt-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">Skill Domain Analysis</h2>
        <p className="text-indigo-100">
          Comprehensive breakdown of your technical expertise based on your
          resume
        </p>
      </div>

      {/* Key Metrics - ALL REAL DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-600">
          <p className="text-gray-600 text-sm font-medium uppercase">
            Total Skills
          </p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalSkills}</p>
          <p className="text-xs text-gray-500 mt-1">Across all domains</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-medium uppercase">
            Unique Skills
          </p>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {uniqueSkillsCount}
          </p>
          <p className="text-xs text-gray-500 mt-1">Distinct competencies</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-medium uppercase">
            Skill Domains
          </p>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {domains.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Categories identified</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-amber-600">
          <p className="text-gray-600 text-sm font-medium uppercase">
            Avg Skills/Domain
          </p>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {avgSkillsPerDomain}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {parseFloat(avgSkillsPerDomain) > 5
              ? "Deep expertise"
              : parseFloat(avgSkillsPerDomain) > 3
              ? "Well rounded"
              : "Focused skills"}
          </p>
        </div>
      </div>

      {/* AI Insights Panel - ONLY REAL DATA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Award className="text-green-600" size={24} />
            <h3 className="font-semibold text-gray-800">Your Top Domains</h3>
          </div>
          <ul className="space-y-2">
            {strongDomains.map((d, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                <span className="font-medium text-green-700">{d.domain}</span>
                <span className="text-gray-600"> - {d.count} skills</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-800">Cross-Domain Skills</h3>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-bold text-blue-700">
              {crossDomainSkills.length}
            </span>{" "}
            skills span multiple domains
          </p>
          {crossDomainSkills.length > 0 ? (
            <div className="text-xs text-gray-600">
              <p className="mb-2">Top transferable skills:</p>
              <div className="flex flex-wrap gap-1">
                {crossDomainSkills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                  >
                    {skill.skill} (×{skill.count})
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-600">
              No skills appear across multiple domains. Consider building
              transferable skills.
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-amber-600" size={24} />
            <h3 className="font-semibold text-gray-800">Emerging Domains</h3>
          </div>
          <ul className="space-y-2">
            {weakDomains.map((d, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                <span className="font-medium text-amber-700">{d.domain}</span>
                <span className="text-gray-600"> - {d.count} skills</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Primary Analytics - REAL DATA ONLY */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Domain Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Skills per Domain
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Distribution of {totalSkills} total skills across {domains.length}{" "}
              identified domains from your resume
            </p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={domains}
              margin={{ top: 10, right: 20, left: 0, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="domain"
                tick={{ angle: -45, textAnchor: "end", fontSize: 11 }}
                height={110}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                allowDecimals={false}
                label={{
                  value: "Skill Count",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]}>
                {domains.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Individual Skill Frequency */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Individual Skill Frequency
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Shows {uniqueSkillsCount} unique skills and how many domains each
              appears in
            </p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={allSkillsData}
              margin={{ top: 10, right: 20, left: 0, bottom: 100 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="skill"
                tick={{ angle: -45, textAnchor: "end", fontSize: 10 }}
                height={110}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                allowDecimals={false}
                label={{
                  value: "Domain Count",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />
              <Tooltip content={<CustomSkillTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Skill Repetition Pattern */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Skill Repetition Pattern
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Distribution showing how many skills appear once, twice, or more
              across domains
            </p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={frequencyData}
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="frequency"
                tick={{ fontSize: 12 }}
                label={{
                  value: "Times Skill Appears",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontSize: 12 },
                }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                allowDecimals={false}
                label={{
                  value: "Number of Skills",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value, name, props) => [
                  `${value} skill${value !== 1 ? "s" : ""}`,
                  `Appear ${props.payload.frequency}`,
                ]}
              />
              <Bar dataKey="skillCount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Domain Balance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Domain Balance & Portfolio Share
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Skill count (bars) and percentage of total portfolio (line) for
              each domain
            </p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={domainBalance}
              margin={{ top: 10, right: 20, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="domain"
                tick={{ angle: -45, textAnchor: "end", fontSize: 11 }}
                height={90}
                interval={0}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                allowDecimals={false}
                label={{
                  value: "Skills",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                label={{
                  value: "Percentage (%)",
                  angle: 90,
                  position: "insideRight",
                  style: { fontSize: 12 },
                }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value, name) => [
                  name === "skills" ? `${value} skills` : `${value}%`,
                  name === "skills" ? "Skill Count" : "Portfolio Share",
                ]}
                labelFormatter={(label, payload) =>
                  payload[0]?.payload?.fullDomain || label
                }
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="skills"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="percentage"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Summary - REAL DATA ONLY */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Portfolio Summary & Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Key Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Strongest Domain:</span>
                <span className="font-semibold text-gray-800">
                  {topDomain.domain} ({topDomain.count})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cross-Domain Skills:</span>
                <span className="font-semibold text-gray-800">
                  {crossDomainSkills.length} (
                  {uniqueSkillsCount > 0
                    ? (
                        (crossDomainSkills.length / uniqueSkillsCount) *
                        100
                      ).toFixed(0)
                    : 0}
                  %)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Skills/Domain:</span>
                <span className="font-semibold text-gray-800">
                  {avgSkillsPerDomain}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profile Type:</span>
                <span className="font-semibold text-gray-800">
                  {parseFloat(avgSkillsPerDomain) > 5
                    ? "Deep Specialist"
                    : parseFloat(avgSkillsPerDomain) > 3
                    ? "Balanced Professional"
                    : "Focused Expert"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">
              Smart Recommendations
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              {crossDomainSkills.length === 0 && (
                <div className="flex gap-2 items-start">
                  <AlertCircle
                    size={16}
                    className="text-blue-500 mt-0.5 flex-shrink-0"
                  />
                  <p>
                    No cross-domain skills detected. Consider building
                    transferable skills to increase versatility.
                  </p>
                </div>
              )}
              {weakDomains.length > 0 &&
                weakDomains[weakDomains.length - 1].count <= 2 && (
                  <div className="flex gap-2 items-start">
                    <AlertCircle
                      size={16}
                      className="text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <p>
                      {weakDomains[weakDomains.length - 1].domain} has only{" "}
                      {weakDomains[weakDomains.length - 1].count} skill(s).
                      Consider deepening expertise in this area.
                    </p>
                  </div>
                )}
              {topDomain.count > totalSkills * 0.5 && (
                <div className="flex gap-2 items-start">
                  <AlertCircle
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <p>
                    Strong specialization in {topDomain.domain} (
                    {((topDomain.count / totalSkills) * 100).toFixed(0)}% of
                    skills). This shows deep domain expertise.
                  </p>
                </div>
              )}
              {domains.length >= 5 && (
                <div className="flex gap-2 items-start">
                  <AlertCircle
                    size={16}
                    className="text-purple-500 mt-0.5 flex-shrink-0"
                  />
                  <p>
                    You have skills across {domains.length} domains, showing
                    good breadth. Focus on deepening 2-3 core areas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Domain List - REAL DATA */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Complete Domain Breakdown
        </h3>
        <div className="space-y-4">
          {domains.map((domain, idx) => (
            <div
              key={idx}
              className="border-l-4 pl-4 py-2"
              style={{ borderColor: COLORS[idx % COLORS.length] }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">{domain.domain}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {((domain.count / totalSkills) * 100).toFixed(1)}% of
                    portfolio
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {domain.count} skills
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill, skillIdx) => {
                  const frequency = skillCounts[skill];
                  return (
                    <span
                      key={skillIdx}
                      className={`px-3 py-1 rounded text-sm border transition-colors ${
                        frequency > 1
                          ? "bg-blue-50 text-blue-700 border-blue-200 font-medium"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      } hover:bg-gray-100`}
                      title={
                        frequency > 1
                          ? `Appears in ${frequency} domains`
                          : "Domain-specific skill"
                      }
                    >
                      {skill}
                      {frequency > 1 && (
                        <span className="ml-1 text-xs">×{frequency}</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainInsights;
