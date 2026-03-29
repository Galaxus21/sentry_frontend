import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { colors } from "@/theme";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.muted,
  },
  content: {
    textAlign: 'center',
  },
  title: {
    marginBottom: '16px',
    fontSize: '36px',
    fontWeight: 700,
    color: colors.foreground,
  },
  text: {
    marginBottom: '16px',
    fontSize: '20px',
    color: colors.mutedForeground,
  },
  link: {
    color: colors.primary,
    textDecoration: 'underline',
    transition: 'color 0.2s',
    ':hover': {
      color: 'hsla(214, 72%, 39%, 0.9)',
    },
  }
});

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.content)}>
        <h1 className={css(styles.title)}>404</h1>
        <p className={css(styles.text)}>Oops! Page not found</p>
        <a href="/" className={css(styles.link)}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
