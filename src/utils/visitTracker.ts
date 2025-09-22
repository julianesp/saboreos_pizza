interface VisitData {
  date: string;
  visits: number;
  uniqueVisitors: Set<string>;
  startTime: number;
  totalTime: number;
  sessions: number;
}

interface StoredVisitData {
  date: string;
  visits: number;
  uniqueVisitors: string[];
  startTime: number;
  totalTime: number;
  sessions: number;
}

interface DailyStats {
  date: string;
  visits: number;
  uniqueVisitors: number;
  averageTime: string;
  sessions: number;
}

class VisitTracker {
  private storageKey = 'saboreos_pizza_visits';
  private sessionKey = 'saboreos_session_id';
  private sessionStartKey = 'saboreos_session_start';
  private historyKey = 'saboreos_pizza_history';

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getStoredData(): VisitData {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed: StoredVisitData = JSON.parse(stored);
        return {
          ...parsed,
          uniqueVisitors: new Set(parsed.uniqueVisitors)
        };
      }
    } catch (error) {
      console.error('Error reading visit data:', error);
    }

    return {
      date: this.getTodayString(),
      visits: 0,
      uniqueVisitors: new Set(),
      startTime: Date.now(),
      totalTime: 0,
      sessions: 0
    };
  }

  private saveData(data: VisitData): void {
    try {
      const toStore: StoredVisitData = {
        ...data,
        uniqueVisitors: Array.from(data.uniqueVisitors)
      };
      localStorage.setItem(this.storageKey, JSON.stringify(toStore));
    } catch (error) {
      console.error('Error saving visit data:', error);
    }
  }

  private resetIfNewDay(data: VisitData): VisitData {
    const today = this.getTodayString();
    if (data.date !== today) {
      // Guardar el día anterior en el historial antes de resetear
      if (data.visits > 0) {
        this.saveToHistory(data);
      }

      return {
        date: today,
        visits: 0,
        uniqueVisitors: new Set(),
        startTime: Date.now(),
        totalTime: 0,
        sessions: 0
      };
    }
    return data;
  }

  private saveToHistory(data: VisitData): void {
    try {
      const history = this.getHistory();
      const averageTimeMs = data.sessions > 0 ? data.totalTime / data.sessions : 0;
      const averageTimeMinutes = Math.floor(averageTimeMs / 60000);
      const averageTimeSeconds = Math.floor((averageTimeMs % 60000) / 1000);

      const dailyStats: DailyStats = {
        date: data.date,
        visits: data.visits,
        uniqueVisitors: data.uniqueVisitors.size,
        averageTime: `${averageTimeMinutes}:${averageTimeSeconds.toString().padStart(2, '0')}`,
        sessions: data.sessions
      };

      // Evitar duplicados
      const existingIndex = history.findIndex(h => h.date === data.date);
      if (existingIndex >= 0) {
        history[existingIndex] = dailyStats;
      } else {
        history.push(dailyStats);
      }

      // Mantener solo los últimos 90 días
      history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const limitedHistory = history.slice(0, 90);

      localStorage.setItem(this.historyKey, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  }

  trackPageVisit(): void {
    let data = this.getStoredData();
    data = this.resetIfNewDay(data);

    let sessionId = sessionStorage.getItem(this.sessionKey);
    let sessionStart = sessionStorage.getItem(this.sessionStartKey);

    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStart = Date.now().toString();
      sessionStorage.setItem(this.sessionKey, sessionId);
      sessionStorage.setItem(this.sessionStartKey, sessionStart);

      data.visits++;
      data.sessions++;
      data.uniqueVisitors.add(sessionId);
    }

    this.saveData(data);
  }

  trackTimeSpent(): void {
    const sessionStart = sessionStorage.getItem(this.sessionStartKey);
    if (sessionStart) {
      const timeSpent = Date.now() - parseInt(sessionStart);
      let data = this.getStoredData();
      data = this.resetIfNewDay(data);

      data.totalTime += timeSpent;
      this.saveData(data);

      sessionStorage.setItem(this.sessionStartKey, Date.now().toString());
    }
  }

  getStats() {
    let data = this.getStoredData();
    data = this.resetIfNewDay(data);

    const averageTimeMs = data.sessions > 0 ? data.totalTime / data.sessions : 0;
    const averageTimeMinutes = Math.floor(averageTimeMs / 60000);
    const averageTimeSeconds = Math.floor((averageTimeMs % 60000) / 1000);

    return {
      todayVisits: data.visits,
      uniqueVisitors: data.uniqueVisitors.size,
      averageTime: `${averageTimeMinutes}:${averageTimeSeconds.toString().padStart(2, '0')}`,
      totalSessions: data.sessions
    };
  }

  getTotalVisitsAllTime(): number {
    try {
      const allTimeKey = 'saboreos_pizza_total_visits';
      const stored = localStorage.getItem(allTimeKey);
      let totalVisits = stored ? parseInt(stored) : 0;

      const currentStats = this.getStats();
      const historyTotal = this.getHistory().reduce((sum, day) => sum + day.visits, 0);
      const grandTotal = historyTotal + currentStats.todayVisits;

      if (grandTotal > totalVisits) {
        totalVisits = grandTotal;
        localStorage.setItem(allTimeKey, totalVisits.toString());
      }

      return totalVisits;
    } catch (error) {
      console.error('Error getting total visits:', error);
      return this.getStats().todayVisits;
    }
  }

  getHistory(): DailyStats[] {
    try {
      const stored = localStorage.getItem(this.historyKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  }

  getAllStats(): { today: any; history: DailyStats[]; totals: any } {
    const todayStats = this.getStats();
    const history = this.getHistory();

    // Guardar estadísticas del día actual antes de devolver
    const currentData = this.getStoredData();
    if (currentData.visits > 0) {
      this.saveToHistory(currentData);
    }

    const totalVisits = history.reduce((sum, day) => sum + day.visits, 0) + todayStats.todayVisits;
    const totalUniqueVisitors = history.reduce((sum, day) => sum + day.uniqueVisitors, 0) + todayStats.uniqueVisitors;
    const totalSessions = history.reduce((sum, day) => sum + day.sessions, 0) + todayStats.totalSessions;

    return {
      today: todayStats,
      history: history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      totals: {
        totalVisits,
        totalUniqueVisitors,
        totalSessions,
        daysTracked: history.length + (todayStats.todayVisits > 0 ? 1 : 0)
      }
    };
  }

  exportToCSV(): string {
    const allStats = this.getAllStats();
    const headers = ['Fecha', 'Visitas', 'Visitantes Únicos', 'Tiempo Promedio', 'Sesiones'];

    let csv = headers.join(',') + '\n';

    // Agregar día actual si tiene datos
    if (allStats.today.todayVisits > 0) {
      const today = this.getTodayString();
      csv += `${today},${allStats.today.todayVisits},${allStats.today.uniqueVisitors},${allStats.today.averageTime},${allStats.today.totalSessions}\n`;
    }

    // Agregar historial
    allStats.history.forEach(day => {
      csv += `${day.date},${day.visits},${day.uniqueVisitors},${day.averageTime},${day.sessions}\n`;
    });

    return csv;
  }

  clearAllData(): void {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.historyKey);
      localStorage.removeItem('saboreos_pizza_total_visits');
      sessionStorage.removeItem(this.sessionKey);
      sessionStorage.removeItem(this.sessionStartKey);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
}

export const visitTracker = new VisitTracker();