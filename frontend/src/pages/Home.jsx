import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Clock, Users, BookOpen, BarChart } from "lucide-react";
import { BASE_API_URL } from "../config/constants";

const Home = () => {
  const [stats, setStats] = useState({
    totalGroups: 0,
    totalStudents: 0,
  });

  const getStats = async () => {
    const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
    try {
      const response = await fetch(`${BASE_API_URL}/getClassrooms`, {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateStats = (data) => {
    const totalGroups = data.length;
    const totalStudents = data.reduce((sum, group) => sum + group.alumnos, 0);
    
    setStats({
      totalGroups,
      totalStudents,
    });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-foreground">Dashboard</h1>
         
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Total de Grupos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGroups}</div>
              <p className="text-xs text-muted-foreground">
                Grupos activos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Total de Estudiantes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Estudiantes registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Promedio por Grupo</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalGroups > 0 
                  ? Math.round(stats.totalStudents / stats.totalGroups) 
                  : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Estudiantes por grupo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; 