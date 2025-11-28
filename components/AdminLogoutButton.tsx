"use client";

export function AdminLogoutButton() {
  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (e) {
      // ignore
    } finally {
      window.location.href = "/admin/login";
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-xs font-medium text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}
