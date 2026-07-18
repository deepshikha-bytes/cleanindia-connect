import { sustainabilityTips } from "../data/tips";

const STORAGE_KEY = "cleanindia_user_tips";

export function getTips() {
  try {
    const savedTips = localStorage.getItem(STORAGE_KEY);

    if (savedTips) {
      const userTips = JSON.parse(savedTips);
      return [...userTips, ...sustainabilityTips];
    }

    return sustainabilityTips;
  } catch (error) {
    console.error("Error reading tips:", error);
    return sustainabilityTips;
  }
}

export function saveUserTips(tips) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
  } catch (error) {
    console.error("Error saving tips:", error);
    throw new Error("Tip could not be saved. Please try again.");
  }
}

export function getUserTipsOnly() {
  try {
    const savedTips = localStorage.getItem(STORAGE_KEY);
    return savedTips ? JSON.parse(savedTips) : [];
  } catch (error) {
    console.error("Error reading user tips:", error);
    return [];
  }
}

export function addTip(tip) {
  const currentUserTips = getUserTipsOnly();

  const newTip = {
    id: `user-tip-${Date.now()}`,
    category: tip.category || "Citizen Tip",
    author: tip.author || "Anonymous Citizen",
    createdAt: new Date().toISOString(),
    ...tip,
  };

  const updatedUserTips = [newTip, ...currentUserTips];

  saveUserTips(updatedUserTips);

  return newTip;
}