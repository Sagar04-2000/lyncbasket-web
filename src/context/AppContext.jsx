// src/context/AppContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { storage, initialBlogs } from "../utils/helpers";

const AppContext = createContext();

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");

  // Auth
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Data
  const [blogs, setBlogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [media, setMedia] = useState([]);

  // UI
  const [notification, setNotification] = useState(null);

  // Superadmin (fixed account)
  const SUPER_USERNAME = "superadmin";
  const SUPER_PASSWORD = "super123";

  const clean = (v) => (typeof v === "string" ? v.trim() : v);
  const readList = (val) => (Array.isArray(val) ? val : null);

  // ======================================================
  // INITIAL LOAD
  // ======================================================
  useEffect(() => {
    const storedBlogs = storage.get("lynkbasket_blogs");
    const storedAdmins = storage.get("lynk_admins");
    const storedMedia = storage.get("lynk_media");

    const adminSession = storage.get("lynkbasket_admin");
    const storedCurrentAdmin = storage.get("lynk_current_admin");

    // BLOGS
    if (readList(storedBlogs) && storedBlogs.length > 0) {
      setBlogs(storedBlogs);
    } else {
      setBlogs(initialBlogs);
      storage.set("lynkbasket_blogs", initialBlogs);
    }

    // ADMINS (Do NOT overwrite saved list)
    let normalizedAdmins = [];

    if (!readList(storedAdmins) || storedAdmins.length === 0) {
      // create initial superadmin
      normalizedAdmins = [
        {
          username: clean(SUPER_USERNAME),
          password: clean(SUPER_PASSWORD),
          role: "super",
        },
      ];
      storage.set("lynk_admins", normalizedAdmins);
    } else {
      normalizedAdmins = storedAdmins.map((a) => ({
        username: clean(a.username),
        password: clean(a.password),
        role: a.role || "admin",
      }));

      // ensure superadmin always exists
      const hasSuper = normalizedAdmins.some(
        (a) => a.username === SUPER_USERNAME
      );

      if (!hasSuper) {
        normalizedAdmins.unshift({
          username: SUPER_USERNAME,
          password: SUPER_PASSWORD,
          role: "super",
        });
      }
    }

    setAdmins(normalizedAdmins);

    // MEDIA
    if (readList(storedMedia)) setMedia(storedMedia);

    // SESSION RESTORE
    if (adminSession && storedCurrentAdmin) {
      const match = normalizedAdmins.find(
        (a) => a.username === clean(storedCurrentAdmin.username)
      );

      if (match) {
        setIsAdmin(true);
        setCurrentAdmin({ username: match.username, role: match.role });
      } else {
        storage.remove("lynkbasket_admin");
        storage.remove("lynk_current_admin");
      }
    }
  }, []);

  // ======================================================
  // PERSIST CHANGES
  // ======================================================
  useEffect(() => storage.set("lynkbasket_blogs", blogs), [blogs]);
  useEffect(() => storage.set("lynk_media", media), [media]);
  // ❗ DO NOT overwrite admins during first load
  useEffect(() => {
    if (admins.length > 0) storage.set("lynk_admins", admins);
  }, [admins]);

  // ======================================================
  // NAVIGATION
  // ======================================================
  const navigateToPage = useCallback((page) => {
    setCurrentPage(page);

    const map = {
      home: "/",
      about: "/about",
      services: "/services",
      "case-studies": "/case-studies",
      blog: "/blog",
      contact: "/contact",

      // admin
      "admin-login": "/admin/login",
      "admin-dashboard": "/admin/dashboard",
      "admin-manage": "/admin/admins",
      "admin-blogs": "/admin/blogs",
      "admin-media": "/admin/media",

      // super admin
      "superadmin-login": "/superadmin",
    };

    window.history.pushState({}, "", map[page] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ======================================================
  // NOTIFICATIONS
  // ======================================================
  const showNotification = (msg, type = "info") =>
    setNotification({ message: msg, type });
  const clearNotification = () => setNotification(null);

  // ======================================================
  // SUPER ADMIN LOGIN
  // ======================================================
  const loginSuperAdmin = (username, password) => {
    username = clean(username);
    password = clean(password);

    if (!username || !password) {
      showNotification("Please enter username and password", "error");
      return false;
    }

    if (username !== SUPER_USERNAME || password !== SUPER_PASSWORD) {
      showNotification("Invalid super admin credentials", "error");
      return false;
    }

    setIsAdmin(true);
    setCurrentAdmin({ username: SUPER_USERNAME, role: "super" });

    storage.set("lynkbasket_admin", true);
    storage.set("lynk_current_admin", {
      username: SUPER_USERNAME,
      role: "super",
    });

    showNotification("Super Admin Login Successful", "success");
    navigateToPage("admin-dashboard");
    return true;
  };

  // ======================================================
  // NORMAL ADMIN LOGIN
  // ======================================================
  const loginAdmin = (username, password) => {
    username = clean(username);
    password = clean(password);

    if (!username || !password) {
      showNotification("Please enter username and password", "error");
      return false;
    }

    if (username === SUPER_USERNAME) {
      showNotification(
        "Super Admin must login from the Super Admin page.",
        "error"
      );
      return false;
    }

    const found = admins.find(
      (a) => a.username === username && a.password === password
    );

    if (!found) {
      showNotification("Invalid admin credentials", "error");
      return false;
    }

    setIsAdmin(true);
    setCurrentAdmin({ username: found.username, role: found.role });

    storage.set("lynkbasket_admin", true);
    storage.set("lynk_current_admin", {
      username: found.username,
      role: found.role,
    });

    showNotification("Login Successful", "success");
    navigateToPage("admin-dashboard");
    return true;
  };

  // ======================================================
  // LOGOUT
  // ======================================================
  const logout = () => {
    setIsAdmin(false);
    setCurrentAdmin(null);
    storage.remove("lynkbasket_admin");
    storage.remove("lynk_current_admin");
    showNotification("Logged out", "success");
    navigateToPage("home");
  };

  // ======================================================
  // ADMIN MANAGEMENT
  // ======================================================
  const addAdmin = (username, password, role = "admin") => {
    username = clean(username);
    password = clean(password);

    if (!username || !password) {
      showNotification("Username and password are required", "error");
      return false;
    }

    if (username === SUPER_USERNAME) {
      showNotification("Cannot override the superadmin account.", "error");
      return false;
    }

    if (admins.some((a) => a.username === username)) {
      showNotification("Username already exists", "error");
      return false;
    }

    const newAdmin = { username, password, role };
    const updated = [...admins, newAdmin];

    setAdmins(updated);

    showNotification("Admin Created Successfully!", "success");
    return true;
  };

  const removeAdmin = (username) => {
    if (username === SUPER_USERNAME) {
      showNotification("Super Admin cannot be removed.", "error");
      return false;
    }

    const updated = admins.filter((a) => a.username !== username);

    setAdmins(updated);

    showNotification("Admin Removed", "success");

    if (currentAdmin?.username === username) logout();

    return true;
  };

  // ======================================================
  // BLOG CRUD
  // ======================================================
  const addBlog = (data) => {
    const newBlog = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBlogs([newBlog, ...blogs]);
    showNotification("Blog created!", "success");
  };

  const updateBlog = (id, updated) => {
    setBlogs(
      blogs.map((b) =>
        b.id === id
          ? { ...b, ...updated, updatedAt: new Date().toISOString() }
          : b
      )
    );
    showNotification("Blog updated!", "success");
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
    showNotification("Blog deleted!", "success");
  };

  // ======================================================
  // MEDIA
  // ======================================================
  const addMedia = (file) => {
    const item = {
      id: Date.now().toString(),
      ...file,
      uploadedAt: new Date().toISOString(),
    };
    setMedia([item, ...media]);
    showNotification("Media uploaded!", "success");
    return item;
  };

  const removeMedia = (id) => {
    setMedia(media.filter((m) => m.id !== id));
    showNotification("Media removed!", "success");
  };

  // ======================================================
  // BACK BUTTON
  // ======================================================
  useEffect(() => {
    const map = {
      "/": "home",
      "/about": "about",
      "/services": "services",
      "/case-studies": "case-studies",
      "/blog": "blog",
      "/contact": "contact",

      "/admin/login": "admin-login",
      "/admin/dashboard": "admin-dashboard",
      "/admin/admins": "admin-manage",
      "/admin/blogs": "admin-blogs",
      "/admin/media": "admin-media",

      "/superadmin": "superadmin-login",
    };

    const handler = () => {
      setCurrentPage(map[window.location.pathname] || "home");
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // ======================================================
  // PROVIDER
  // ======================================================
  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateToPage,

        // AUTH
        isAdmin,
        currentAdmin,
        loginAdmin,
        loginSuperAdmin,
        logout,

        // ADMIN
        admins,
        addAdmin,
        removeAdmin,

        // BLOGS
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,

        // MEDIA
        media,
        addMedia,
        removeMedia,

        // UI
        notification,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
