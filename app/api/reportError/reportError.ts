import Bugsnag from "@bugsnag/js";

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY || "",
});

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface ErrorObject {
  message?: string;
  stack?: string;
  user?: User;
}

/**
 * Helper function to report events.
 *
 * @param errorObject - The error object containing message, stack, and user details.
 * e.g. { message: "An error occurred", stack: "Error: An error occurred", user: { id: "123", email: "djones@email.com", firstName: "Davy", lastName: "Jones" } }
 */
export const reportError = (errorObject: ErrorObject): void => {
  try {
    const defaultErrorMessage = "An unknown error occurred";
    const defaultErrorStack = "No stack trace available";

    if (errorObject?.user) {
      const { id, email, firstName, lastName } = errorObject.user;
      const userFullName = [firstName, lastName].filter(Boolean).join(" ");

      Bugsnag.setUser(
        id || "unknown",
        email || "unknown",
        userFullName || "Anonymous User"
      );
    }

    Bugsnag.notify(
      new Error(errorObject?.message || defaultErrorMessage),
      (event) => {
        event.addMetadata("info", {
          message: errorObject?.message || defaultErrorMessage,
          stack: errorObject?.stack || defaultErrorStack,
          user: errorObject?.user || "unknown",
        });
      }
    );
  } catch (error) {
    console.error("Failed to report to Bugsnag:", error);
    throw new Error("Failed to report error");
  }
};
