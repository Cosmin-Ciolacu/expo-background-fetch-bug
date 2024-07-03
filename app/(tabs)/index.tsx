import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch-task";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    console.log("Background fetch task started");
    // Your background fetch logic here
    const receivedNewData = true; // Simulate a fetch operation

    console.log(
      "Background fetch task completed with new data:",
      receivedNewData
    );
    return receivedNewData
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    console.error("Background fetch task error:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function registerBackgroundFetchAsync() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 2, // 15 minutes
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log("Background fetch task registered");
  } catch (error) {
    console.error("Failed to register background fetch task:", error);
  }
}

export default function App() {
  useEffect(() => {
    registerBackgroundFetchAsync();
  }, []);

  return (
    <View>
      <Text>Background Fetch Example</Text>
    </View>
  );
}
