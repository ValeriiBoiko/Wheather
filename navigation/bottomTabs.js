import { Color } from "../constants";

export const bottomTabsConfig = (sources = []) => {
    if (sources.length === 0) {
        sources = [
            'day',
            'week',
            'settings'
        ]
    }

    return {
        children: [
            {
                component: {
                    id: "screen.DailyForecast",
                    name: "screen.DailyForecast",
                    options: {
                        bottomTab: {
                            icon: sources[0],
                            text: 'Today',
                            selectedIconColor: Color.BLUE
                        },
                        bottomTabs: {
                            drawBehind: true
                        }
                    }
                }
            },
            {
                component: {
                    id: "screen.WeeklyForecast",
                    name: "screen.WeeklyForecast",
                    options: {
                        bottomTab: {
                            icon: sources[1],
                            text: 'Weekly',
                            selectedIconColor: Color.BLUE
                        },
                        bottomTabs: {
                            drawBehind: true
                        }
                    }
                }
            },
            {
                component: {
                    id: "screen.Share",
                    name: "screen.Settings",
                    options: {
                        bottomTab: {
                            icon: sources[2],
                            text: 'Settings',
                            selectedIconColor: Color.BLUE
                        },
                        bottomTabs: {
                            drawBehind: true
                        }
                    }
                }
            }
        ]
    }
};