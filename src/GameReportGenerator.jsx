// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
// import { User, TrendingUp, Clock, Target, Brain, Star, Award, Activity } from 'lucide-react';
// import "./GameReportGenerator.css";

// const GameReportGenerator = () => {
//   const [selectedUser, setSelectedUser] = useState('user_001');
//   const [reportType, setReportType] = useState('comprehensive');
//   const [reportData, setReportData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Mock database data
//   const mockUserData = {
//     user_001: {
//       profile: {
//         name: "Alex Chen",
//         age: 24,
//         joinDate: "2024-01-15",
//         totalGameTime: 45.5,
//         gamesPlayed: 127
//       },
//       gameHistory: [
//         { date: '2024-06-01', game: 'Ocean Explorer', duration: 25, score: 850, theme: 'marine', skills: ['observation', 'concentration'] },
//         { date: '2024-06-03', game: 'Deep Sea Adventure', duration: 30, score: 920, theme: 'marine', skills: ['reflexes', 'decision-making'] },
//         { date: '2024-06-05', game: 'Forest Quest', duration: 20, score: 780, theme: 'nature', skills: ['memory', 'spatial-reasoning'] },
//         { date: '2024-06-07', game: 'Marine Biology Quiz', duration: 15, score: 950, theme: 'marine', skills: ['knowledge', 'observation'] },
//         { date: '2024-06-10', game: 'Underwater Maze', duration: 35, score: 880, theme: 'marine', skills: ['navigation', 'patience'] }
//       ],
//       skillProgress: {
//         observation: { current: 85, previous: 70, trend: 'improving' },
//         concentration: { current: 78, previous: 75, trend: 'stable' },
//         reflexes: { current: 72, previous: 80, trend: 'declining' },
//         memory: { current: 90, previous: 85, trend: 'improving' },
//         'decision-making': { current: 82, previous: 78, trend: 'improving' },
//         'spatial-reasoning': { current: 75, previous: 70, trend: 'improving' },
//         navigation: { current: 88, previous: 82, trend: 'improving' },
//         patience: { current: 70, previous: 65, trend: 'improving' }
//       },
//       emotionalAnalysis: {
//         engagement: 8.5,
//         frustration: 2.3,
//         satisfaction: 8.8,
//         confidence: 7.9,
//         motivation: 8.2
//       },
//       themePreferences: {
//         marine: 60,
//         nature: 25,
//         space: 10,
//         urban: 5
//       }
//     }
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

//   // AI Agent for Report Generation
//   const generateReport = async (userId) => {
//     setIsGenerating(true);
    
//     // Simulate AI processing
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     const userData = mockUserData[userId];
//     const aiInsights = analyzeUserData(userData);
    
//     setReportData({
//       ...userData,
//       aiInsights
//     });
    
//     setIsGenerating(false);
//   };

//   const analyzeUserData = (userData) => {
//     const { gameHistory, skillProgress, emotionalAnalysis, themePreferences } = userData;
    
//     // AI Analysis Logic
//     const totalGames = gameHistory.length;
//     const avgScore = gameHistory.reduce((sum, game) => sum + game.score, 0) / totalGames;
//     const avgDuration = gameHistory.reduce((sum, game) => sum + game.duration, 0) / totalGames;
    
//     // Theme analysis
//     const dominantTheme = Object.keys(themePreferences).reduce((a, b) => 
//       themePreferences[a] > themePreferences[b] ? a : b
//     );
    
//     // Skill improvement analysis
//     const improvingSkills = Object.keys(skillProgress).filter(
//       skill => skillProgress[skill].trend === 'improving'
//     );
    
//     const decliningSkills = Object.keys(skillProgress).filter(
//       skill => skillProgress[skill].trend === 'declining'
//     );
    
//     // Performance trend
//     const recentGames = gameHistory.slice(-3);
//     const earlierGames = gameHistory.slice(0, 3);
//     const recentAvgScore = recentGames.reduce((sum, game) => sum + game.score, 0) / recentGames.length;
//     const earlierAvgScore = earlierGames.reduce((sum, game) => sum + game.score, 0) / earlierGames.length;
//     const performanceTrend = recentAvgScore > earlierAvgScore ? 'improving' : 'declining';
    
//     return {
//       summary: {
//         avgScore: Math.round(avgScore),
//         avgDuration: Math.round(avgDuration),
//         dominantTheme,
//         performanceTrend,
//         engagementLevel: emotionalAnalysis.engagement > 7 ? 'High' : emotionalAnalysis.engagement > 5 ? 'Medium' : 'Low'
//       },
//       skills: {
//         improving: improvingSkills,
//         declining: decliningSkills,
//         strongest: Object.keys(skillProgress).reduce((a, b) => 
//           skillProgress[a].current > skillProgress[b].current ? a : b
//         ),
//         weakest: Object.keys(skillProgress).reduce((a, b) => 
//           skillProgress[a].current < skillProgress[b].current ? a : b
//         )
//       },
//       recommendations: generateRecommendations(userData),
//       personalityInsights: generatePersonalityInsights(themePreferences, emotionalAnalysis)
//     };
//   };

//   const generateRecommendations = (userData) => {
//     const { themePreferences, skillProgress } = userData;
//     const recommendations = [];
    
//     // Theme-based recommendations
//     if (themePreferences.marine > 50) {
//       recommendations.push({
//         type: 'interest',
//         title: 'Marine Biology Exploration',
//         description: 'Your strong interest in marine themes suggests you might enjoy marine biology courses or documentaries.'
//       });
//     }
    
//     // Skill-based recommendations
//     const weakSkills = Object.keys(skillProgress).filter(
//       skill => skillProgress[skill].current < 75
//     );
    
//     if (weakSkills.includes('reflexes')) {
//       recommendations.push({
//         type: 'skill',
//         title: 'Reflex Training Games',
//         description: 'Focus on action-oriented games to improve reaction time and reflexes.'
//       });
//     }
    
//     return recommendations;
//   };

//   const generatePersonalityInsights = (themes, emotions) => {
//     const insights = [];
    
//     if (themes.marine > 40) {
//       insights.push("Shows strong affinity for aquatic environments and marine life");
//     }
    
//     if (emotions.patience > 7) {
//       insights.push("Demonstrates high levels of patience and persistence");
//     }
    
//     if (emotions.engagement > 8) {
//       insights.push("Highly engaged learner with strong intrinsic motivation");
//     }
    
//     return insights;
//   };

//   useEffect(() => {
//     generateReport(selectedUser);
//   }, [selectedUser]);

//   const skillRadarData = reportData ? Object.keys(reportData.skillProgress).map(skill => ({
//     skill: skill.charAt(0).toUpperCase() + skill.slice(1),
//     current: reportData.skillProgress[skill].current,
//     previous: reportData.skillProgress[skill].previous
//   })) : [];

//   const performanceData = reportData ? reportData.gameHistory.map((game, index) => ({
//     game: index + 1,
//     score: game.score,
//     duration: game.duration
//   })) : [];

//   const themeData = reportData ? Object.keys(reportData.themePreferences).map(theme => ({
//     name: theme.charAt(0).toUpperCase() + theme.slice(1),
//     value: reportData.themePreferences[theme]
//   })) : [];

//   if (isGenerating) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating AI Report...</h2>
//             <p className="text-gray-600">Analyzing gaming data and generating personalized insights</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!reportData) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <User className="h-8 w-8 text-blue-600" />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-800">Gaming Performance Report</h1>
//                 <p className="text-gray-600">AI-Powered Analysis for {reportData.profile.name}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
//               <p className="text-sm text-gray-500">Report ID: {selectedUser}</p>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <div className="flex items-center space-x-2">
//                 <Clock className="h-5 w-5 text-blue-600" />
//                 <span className="text-sm font-medium text-gray-600">Total Hours</span>
//               </div>
//               <p className="text-2xl font-bold text-blue-600">{reportData.profile.totalGameTime}</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg">
//               <div className="flex items-center space-x-2">
//                 <Target className="h-5 w-5 text-green-600" />
//                 <span className="text-sm font-medium text-gray-600">Games Played</span>
//               </div>
//               <p className="text-2xl font-bold text-green-600">{reportData.profile.gamesPlayed}</p>
//             </div>
//             <div className="bg-purple-50 p-4 rounded-lg">
//               <div className="flex items-center space-x-2">
//                 <Star className="h-5 w-5 text-purple-600" />
//                 <span className="text-sm font-medium text-gray-600">Avg Score</span>
//               </div>
//               <p className="text-2xl font-bold text-purple-600">{reportData.aiInsights.summary.avgScore}</p>
//             </div>
//             <div className="bg-orange-50 p-4 rounded-lg">
//               <div className="flex items-center space-x-2">
//                 <TrendingUp className="h-5 w-5 text-orange-600" />
//                 <span className="text-sm font-medium text-gray-600">Trend</span>
//               </div>
//               <p className="text-2xl font-bold text-orange-600 capitalize">
//                 {reportData.aiInsights.summary.performanceTrend}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* AI Summary */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center space-x-2 mb-4">
//             <Brain className="h-6 w-6 text-indigo-600" />
//             <h2 className="text-2xl font-bold text-gray-800">AI Analysis Summary</h2>
//           </div>
//           <div className="bg-indigo-50 p-4 rounded-lg mb-4">
//             <p className="text-gray-700 leading-relaxed">
//               Based on comprehensive data analysis, {reportData.profile.name} shows a <strong>{reportData.aiInsights.summary.performanceTrend}</strong> performance trend 
//               with an average score of <strong>{reportData.aiInsights.summary.avgScore}</strong>. The user demonstrates a strong preference for 
//               <strong> {reportData.aiInsights.summary.dominantTheme}</strong> themed games ({reportData.themePreferences[reportData.aiInsights.summary.dominantTheme]}% of gameplay), 
//               indicating potential interest in related real-world subjects. Engagement level is classified as <strong>{reportData.aiInsights.summary.engagementLevel}</strong>, 
//               with {reportData.aiInsights.skills.improving.length} skills showing improvement.
//             </p>
//           </div>
//         </div>

//         {/* Performance Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Performance Trend */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Trend</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={performanceData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="game" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Theme Preferences */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Theme Preferences</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={themeData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {themeData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Skills Analysis */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Skills Radar */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Skills Assessment</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <RadarChart data={skillRadarData}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="skill" />
//                 <PolarRadiusAxis angle={90} domain={[0, 100]} />
//                 <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                 <Radar name="Previous" dataKey="previous" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
//                 <Legend />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Skills Progress */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Skills Progress</h3>
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-semibold text-green-600 mb-2">Improving Skills</h4>
//                 <div className="space-y-2">
//                   {reportData.aiInsights.skills.improving.map(skill => (
//                     <div key={skill} className="flex items-center justify-between p-2 bg-green-50 rounded">
//                       <span className="capitalize">{skill.replace('-', ' ')}</span>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-sm text-gray-600">
//                           {reportData.skillProgress[skill].previous} → {reportData.skillProgress[skill].current}
//                         </span>
//                         <TrendingUp className="h-4 w-4 text-green-600" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {reportData.aiInsights.skills.declining.length > 0 && (
//                 <div>
//                   <h4 className="font-semibold text-red-600 mb-2">Needs Attention</h4>
//                   <div className="space-y-2">
//                     {reportData.aiInsights.skills.declining.map(skill => (
//                       <div key={skill} className="flex items-center justify-between p-2 bg-red-50 rounded">
//                         <span className="capitalize">{skill.replace('-', ' ')}</span>
//                         <div className="flex items-center space-x-2">
//                           <span className="text-sm text-gray-600">
//                             {reportData.skillProgress[skill].previous} → {reportData.skillProgress[skill].current}
//                           </span>
//                           <Activity className="h-4 w-4 text-red-600" />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Emotional Analysis */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Emotional Analysis</h3>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//             {Object.entries(reportData.emotionalAnalysis).map(([emotion, score]) => (
//               <div key={emotion} className="text-center">
//                 <div className="text-2xl font-bold text-blue-600 mb-1">{score}/10</div>
//                 <div className="text-sm font-medium text-gray-600 capitalize">{emotion}</div>
//                 <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                   <div 
//                     className="bg-blue-600 h-2 rounded-full" 
//                     style={{ width: `${score * 10}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recommendations */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center space-x-2 mb-4">
//             <Award className="h-6 w-6 text-yellow-600" />
//             <h3 className="text-xl font-bold text-gray-800">AI Recommendations</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {reportData.aiInsights.recommendations.map((rec, index) => (
//               <div key={index} className="p-4 border border-gray-200 rounded-lg">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <div className={`w-3 h-3 rounded-full ${rec.type === 'interest' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
//                   <h4 className="font-semibold text-gray-800">{rec.title}</h4>
//                 </div>
//                 <p className="text-gray-600 text-sm">{rec.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Personality Insights */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Personality Insights</h3>
//           <div className="space-y-2">
//             {reportData.aiInsights.personalityInsights.map((insight, index) => (
//               <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
//                 <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
//                 <p className="text-gray-700">{insight}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameReportGenerator;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { User, TrendingUp, Clock, Target, Brain, Star, Award, Activity } from 'lucide-react';
import "./GameReportGenerator.css";

const GameReportGenerator = () => {
  const [selectedUser, setSelectedUser] = useState('user_001');
  const [reportType, setReportType] = useState('comprehensive');
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock database data
  const mockUserData = {
    user_001: {
      profile: {
        name: "Alex Chen",
        age: 24,
        joinDate: "2024-01-15",
        totalGameTime: 45.5,
        gamesPlayed: 127
      },
      gameHistory: [
        { date: '2024-06-01', game: 'Ocean Explorer', duration: 25, score: 850, theme: 'marine', skills: ['observation', 'concentration'] },
        { date: '2024-06-03', game: 'Deep Sea Adventure', duration: 30, score: 920, theme: 'marine', skills: ['reflexes', 'decision-making'] },
        { date: '2024-06-05', game: 'Forest Quest', duration: 20, score: 780, theme: 'nature', skills: ['memory', 'spatial-reasoning'] },
        { date: '2024-06-07', game: 'Marine Biology Quiz', duration: 15, score: 950, theme: 'marine', skills: ['knowledge', 'observation'] },
        { date: '2024-06-10', game: 'Underwater Maze', duration: 35, score: 880, theme: 'marine', skills: ['navigation', 'patience'] }
      ],
      skillProgress: {
        observation: { current: 85, previous: 70, trend: 'improving' },
        concentration: { current: 78, previous: 75, trend: 'stable' },
        reflexes: { current: 72, previous: 80, trend: 'declining' },
        memory: { current: 90, previous: 85, trend: 'improving' },
        'decision-making': { current: 82, previous: 78, trend: 'improving' },
        'spatial-reasoning': { current: 75, previous: 70, trend: 'improving' },
        navigation: { current: 88, previous: 82, trend: 'improving' },
        patience: { current: 70, previous: 65, trend: 'improving' }
      },
      emotionalAnalysis: {
        engagement: 8.5,
        frustration: 2.3,
        satisfaction: 8.8,
        confidence: 7.9,
        motivation: 8.2
      },
      themePreferences: {
        marine: 60,
        nature: 25,
        space: 10,
        urban: 5
      }
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // AI Agent for Report Generation
  const generateReport = async (userId) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const userData = mockUserData[userId];
    const aiInsights = analyzeUserData(userData);
    
    setReportData({
      ...userData,
      aiInsights
    });
    
    setIsGenerating(false);
  };

  const analyzeUserData = (userData) => {
    const { gameHistory, skillProgress, emotionalAnalysis, themePreferences } = userData;
    
    // AI Analysis Logic
    const totalGames = gameHistory.length;
    const avgScore = gameHistory.reduce((sum, game) => sum + game.score, 0) / totalGames;
    const avgDuration = gameHistory.reduce((sum, game) => sum + game.duration, 0) / totalGames;
    
    // Theme analysis
    const dominantTheme = Object.keys(themePreferences).reduce((a, b) => 
      themePreferences[a] > themePreferences[b] ? a : b
    );
    
    // Skill improvement analysis
    const improvingSkills = Object.keys(skillProgress).filter(
      skill => skillProgress[skill].trend === 'improving'
    );
    
    const decliningSkills = Object.keys(skillProgress).filter(
      skill => skillProgress[skill].trend === 'declining'
    );
    
    // Performance trend
    const recentGames = gameHistory.slice(-3);
    const earlierGames = gameHistory.slice(0, 3);
    const recentAvgScore = recentGames.reduce((sum, game) => sum + game.score, 0) / recentGames.length;
    const earlierAvgScore = earlierGames.reduce((sum, game) => sum + game.score, 0) / earlierGames.length;
    const performanceTrend = recentAvgScore > earlierAvgScore ? 'improving' : 'declining';
    
    return {
      summary: {
        avgScore: Math.round(avgScore),
        avgDuration: Math.round(avgDuration),
        dominantTheme,
        performanceTrend,
        engagementLevel: emotionalAnalysis.engagement > 7 ? 'High' : emotionalAnalysis.engagement > 5 ? 'Medium' : 'Low'
      },
      skills: {
        improving: improvingSkills,
        declining: decliningSkills,
        strongest: Object.keys(skillProgress).reduce((a, b) => 
          skillProgress[a].current > skillProgress[b].current ? a : b
        ),
        weakest: Object.keys(skillProgress).reduce((a, b) => 
          skillProgress[a].current < skillProgress[b].current ? a : b
        )
      },
      recommendations: generateRecommendations(userData),
      personalityInsights: generatePersonalityInsights(themePreferences, emotionalAnalysis)
    };
  };

  const generateRecommendations = (userData) => {
    const { themePreferences, skillProgress } = userData;
    const recommendations = [];
    
    // Theme-based recommendations
    if (themePreferences.marine > 50) {
      recommendations.push({
        type: 'interest',
        title: 'Marine Biology Exploration',
        description: 'Your strong interest in marine themes suggests you might enjoy marine biology courses or documentaries.'
      });
    }
    
    // Skill-based recommendations
    const weakSkills = Object.keys(skillProgress).filter(
      skill => skillProgress[skill].current < 75
    );
    
    if (weakSkills.includes('reflexes')) {
      recommendations.push({
        type: 'skill',
        title: 'Reflex Training Games',
        description: 'Focus on action-oriented games to improve reaction time and reflexes.'
      });
    }
    
    return recommendations;
  };

  const generatePersonalityInsights = (themes, emotions) => {
    const insights = [];
    
    if (themes.marine > 40) {
      insights.push("Shows strong affinity for aquatic environments and marine life");
    }
    
    if (emotions.patience > 7) {
      insights.push("Demonstrates high levels of patience and persistence");
    }
    
    if (emotions.engagement > 8) {
      insights.push("Highly engaged learner with strong intrinsic motivation");
    }
    
    return insights;
  };

  useEffect(() => {
    generateReport(selectedUser);
  }, [selectedUser]);

  const skillRadarData = reportData ? Object.keys(reportData.skillProgress).map(skill => ({
    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
    current: reportData.skillProgress[skill].current,
    previous: reportData.skillProgress[skill].previous
  })) : [];

  const performanceData = reportData ? reportData.gameHistory.map((game, index) => ({
    game: index + 1,
    score: game.score,
    duration: game.duration
  })) : [];

  const themeData = reportData ? Object.keys(reportData.themePreferences).map(theme => ({
    name: theme.charAt(0).toUpperCase() + theme.slice(1),
    value: reportData.themePreferences[theme]
  })) : [];

  if (isGenerating) {
    return (
      <div className="game-report-container">
        <div className="loading-container">
          <div className="loading-card">
            <div className="loading-spinner"></div>
            <h2 className="loading-title">Generating AI Report...</h2>
            <p className="loading-subtitle">Analyzing gaming data and generating personalized insights</p>
          </div>
        </div>
      </div>
    );
  }

  if (!reportData) return null;

  return (
    <div className="game-report-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="card">
          <div className="header-content">
            <div className="header-left">
              <User className="header-icon" />
              <div>
                <h1 className="main-title">Gaming Performance Report</h1>
                <p className="subtitle">AI-Powered Analysis for {reportData.profile.name}</p>
              </div>
            </div>
            <div className="header-right">
              <p className="header-meta">Generated on {new Date().toLocaleDateString()}</p>
              <p className="header-meta">Report ID: {selectedUser}</p>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-header">
                <Clock className="stat-icon blue" />
                <span className="stat-label">Total Hours</span>
              </div>
              <p className="stat-value blue">{reportData.profile.totalGameTime}</p>
            </div>
            <div className="stat-card green">
              <div className="stat-header">
                <Target className="stat-icon green" />
                <span className="stat-label">Games Played</span>
              </div>
              <p className="stat-value green">{reportData.profile.gamesPlayed}</p>
            </div>
            <div className="stat-card purple">
              <div className="stat-header">
                <Star className="stat-icon purple" />
                <span className="stat-label">Avg Score</span>
              </div>
              <p className="stat-value purple">{reportData.aiInsights.summary.avgScore}</p>
            </div>
            <div className="stat-card orange">
              <div className="stat-header">
                <TrendingUp className="stat-icon orange" />
                <span className="stat-label">Trend</span>
              </div>
              <p className="stat-value orange capitalize">
                {reportData.aiInsights.summary.performanceTrend}
              </p>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="card">
          <div className="section-header">
            <Brain className="section-icon" />
            <h2 className="section-title">AI Analysis Summary</h2>
          </div>
          <div className="ai-summary">
            <p className="ai-summary-text">
              Based on comprehensive data analysis, {reportData.profile.name} shows a <strong>{reportData.aiInsights.summary.performanceTrend}</strong> performance trend 
              with an average score of <strong>{reportData.aiInsights.summary.avgScore}</strong>. The user demonstrates a strong preference for 
              <strong> {reportData.aiInsights.summary.dominantTheme}</strong> themed games ({reportData.themePreferences[reportData.aiInsights.summary.dominantTheme]}% of gameplay), 
              indicating potential interest in related real-world subjects. Engagement level is classified as <strong>{reportData.aiInsights.summary.engagementLevel}</strong>, 
              with {reportData.aiInsights.skills.improving.length} skills showing improvement.
            </p>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="charts-grid">
          {/* Performance Trend */}
          <div className="chart-container">
            <h3 className="chart-title">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Theme Preferences */}
          <div className="chart-container">
            <h3 className="chart-title">Theme Preferences</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={themeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {themeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Analysis */}
        <div className="charts-grid">
          {/* Skills Radar */}
          <div className="chart-container">
            <h3 className="chart-title">Skills Assessment</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={skillRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Previous" dataKey="previous" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skills Progress */}
          <div className="chart-container">
            <h3 className="chart-title">Skills Progress</h3>
            <div className="skills-section">
              <div>
                <h4 className="skill-category-title improving">Improving Skills</h4>
                <div className="skill-items">
                  {reportData.aiInsights.skills.improving.map(skill => (
                    <div key={skill} className="skill-item improving">
                      <span className="skill-name">{skill.replace('-', ' ')}</span>
                      <div className="skill-progress">
                        <span className="skill-scores">
                          {reportData.skillProgress[skill].previous} → {reportData.skillProgress[skill].current}
                        </span>
                        <TrendingUp className="skill-trend-icon improving" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {reportData.aiInsights.skills.declining.length > 0 && (
                <div>
                  <h4 className="skill-category-title declining">Needs Attention</h4>
                  <div className="skill-items">
                    {reportData.aiInsights.skills.declining.map(skill => (
                      <div key={skill} className="skill-item declining">
                        <span className="skill-name">{skill.replace('-', ' ')}</span>
                        <div className="skill-progress">
                          <span className="skill-scores">
                            {reportData.skillProgress[skill].previous} → {reportData.skillProgress[skill].current}
                          </span>
                          <Activity className="skill-trend-icon declining" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emotional Analysis */}
        <div className="card">
          <h3 className="section-title">Emotional Analysis</h3>
          <div className="emotion-grid">
            {Object.entries(reportData.emotionalAnalysis).map(([emotion, score]) => (
              <div key={emotion} className="emotion-item">
                <div className="emotion-score">{score}/10</div>
                <div className="emotion-label">{emotion}</div>
                <div className="emotion-bar-container">
                  <div 
                    className="emotion-bar" 
                    style={{ width: `${score * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <div className="section-header">
            <Award className="section-icon" />
            <h3 className="section-title">AI Recommendations</h3>
          </div>
          <div className="recommendations-grid">
            {reportData.aiInsights.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-header">
                  <div className={`recommendation-type-indicator ${rec.type}`}></div>
                  <h4 className="recommendation-title">{rec.title}</h4>
                </div>
                <p className="recommendation-description">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Insights */}
        <div className="card">
          <h3 className="section-title">Personality Insights</h3>
          <div className="insights-list">
            {reportData.aiInsights.personalityInsights.map((insight, index) => (
              <div key={index} className="insight-item">
                <div className="insight-bullet"></div>
                <p className="insight-text">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameReportGenerator;