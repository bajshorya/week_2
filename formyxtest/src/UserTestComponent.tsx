import { useState, useRef } from "react";
import { InputField } from "@shoryabaj/formyx";
import {
  emailValidationRule,
  usernameValidationRule,
  passwordValidationRule,
  phoneValidationRule,
  urlValidationRule,
  creditCardValidationRule,
  createAgeValidationRule,
  handleValidation,
} from "@shoryabaj/formyx";

const UserTestComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
    website: "",
    creditCard: "",
    age: "",
    search: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validationLog, setValidationLog] = useState<string[]>([]);
  const validationCount = useRef(0);

  const addLog = (message: string) => {
    setValidationLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${message}`,
      ...prev.slice(0, 10), 
    ]);
  };

  const handleChange = (
    name: string,
    value: unknown,
    shouldValidate = false
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (shouldValidate) {
      validationCount.current += 1;
      addLog(`Validation #${validationCount.current} for ${name}: "${value}"`);
      validateField(name, value);
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    addLog(`Field blurred: ${name}`);
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = async (name: string, value: unknown) => {
    let error = "";

    try {
      switch (name) {
        case "email":
          if (value || touched.email) {
            const result = await handleValidation(
              emailValidationRule.validate!,
              value
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "username":
          if (value || touched.username) {
            const result = await handleValidation(
              usernameValidationRule.validate!,
              value
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "password":
          if (value || touched.password) {
            const result = await handleValidation(
              passwordValidationRule.validate!,
              value
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "phone":
          if (value || touched.phone) {
            const result = await handleValidation(
              phoneValidationRule.validate!,
              value
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "website":
          if (value || touched.website) {
            const result = await handleValidation(
              urlValidationRule.validate!,
              value
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "creditCard":
          if (value || touched.creditCard) {
            const result = await handleValidation(
              creditCardValidationRule.validate!,
              value
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "age":
          if (value || touched.age) {
            const ageValidator = createAgeValidationRule(18).validate!;
            const result = await handleValidation(ageValidator, value);
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;

        case "search":
          if (value && typeof value === "string") {
            if (value.length > 0 && value.length < 2) {
              error = "Search must be at least 2 characters";
            }
          }
          break;

        case "bio":
          if (value && typeof value === "string") {
            if (value.length > 100) {
              error = "Bio must be less than 100 characters";
            }
          }
          break;

        default:
          break;
      }
    } catch (err) {
      error = "Validation failed";
      console.error(`Validation error for ${name}:`, err);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    if (error) {
      addLog(`❌ ${name} error: ${error}`);
    } else if (value) {
      addLog(`✅ ${name} is valid`);
    }
  };

  const clearLogs = () => {
    setValidationLog([]);
    validationCount.current = 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog("📤 Form submission attempted");

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
      setTouched((prev) => ({ ...prev, [key]: true }));
    });

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      alert("Form submitted successfully!");
      addLog("🎉 Form submitted successfully!");
    } else {
      alert("Please fix validation errors before submitting.");
      addLog("❌ Form has validation errors");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Formyx Validators Demo</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Testing custom validators with debounce and throttle
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        <div>
          <form
            onSubmit={handleSubmit}
            className="formyx-form formyx-modern formyx-spacing-md"
          >
            <h2>🔍 Custom Validators Demo</h2>

            <div
              style={{
                border: "2px solid #3b82f6",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ color: "#3b82f6", marginTop: 0 }}>
                Debounce Validators (500ms)
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  margin: "0 0 1rem 0",
                }}
              >
                Uses custom validators after user stops typing
              </p>

              <InputField
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="test@example.com"
                validation={emailValidationRule}
                debounce={500}
                validationStrategy="debounce"
                error={errors.email}
                touched={touched.email}
              />

              <InputField
                name="website"
                type="url"
                label="Website URL"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://example.com"
                validation={urlValidationRule}
                debounce={500}
                validationStrategy="debounce"
                error={errors.website}
                touched={touched.website}
              />
            </div>

            <div
              style={{
                border: "2px solid #10b981",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ color: "#10b981", marginTop: 0 }}>
                Throttle Validators (300ms)
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  margin: "0 0 1rem 0",
                }}
              >
                Uses custom validators at regular intervals while typing
              </p>

              <InputField
                name="username"
                type="text"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter username (min 3 chars)"
                validation={usernameValidationRule}
                throttle={300}
                validationStrategy="throttle"
                error={errors.username}
                touched={touched.username}
              />

              <InputField
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1 (555) 123-4567"
                validation={phoneValidationRule}
                throttle={300}
                validationStrategy="throttle"
                error={errors.phone}
                touched={touched.phone}
              />
            </div>

            <div
              style={{
                border: "2px solid #ef4444",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ color: "#ef4444", marginTop: 0 }}>
                Immediate Validators
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  margin: "0 0 1rem 0",
                }}
              >
                Uses custom validators on every keystroke
              </p>

              <InputField
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password (min 6 chars)"
                validation={passwordValidationRule}
                validationStrategy="immediate"
                error={errors.password}
                touched={touched.password}
              />

              <InputField
                name="creditCard"
                type="text"
                label="Credit Card"
                value={formData.creditCard}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234 5678 9012 3456"
                validation={creditCardValidationRule}
                validationStrategy="immediate"
                error={errors.creditCard}
                touched={touched.creditCard}
              />
            </div>

            <div
              style={{
                border: "2px solid #8b5cf6",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ color: "#8b5cf6", marginTop: 0 }}>
                Advanced Validators
              </h3>

              <InputField
                name="age"
                type="number"
                label="Age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your age"
                validation={createAgeValidationRule(18)}
                debounce={400}
                validationStrategy="debounce"
                error={errors.age}
                touched={touched.age}
              />

              <InputField
                name="search"
                type="text"
                label="Live Search"
                value={formData.search}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Type to search..."
                throttle={200}
                validationStrategy="throttle"
                error={errors.search}
                touched={touched.search}
              />

              <InputField
                name="bio"
                type="textarea"
                label="Bio"
                value={formData.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Short bio (max 100 chars)"
                validationStrategy="immediate"
                error={errors.bio}
                touched={touched.bio}
                rows={2}
              />
            </div>

            <button
              type="submit"
              className="formyx-submit-button"
              style={{ marginTop: "1rem" }}
            >
              Submit Form
            </button>
          </form>
        </div>

        <div>
          <div
            style={{
              background: "#1f2937",
              color: "white",
              padding: "1rem",
              borderRadius: "8px",
              height: "600px",
              overflowY: "auto",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ margin: 0, color: "white" }}>📊 Validation Log</h3>
              <button
                onClick={clearLogs}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>

            <div
              style={{
                color: "#9ca3af",
                marginBottom: "0.5rem",
                fontSize: "11px",
              }}
            >
              <div>
                💡 <strong>Test these scenarios:</strong>
              </div>
              <div>• Email: "test" (invalid), "test@example.com" (valid)</div>
              <div>
                • Username: "ab" (too short), "user@name" (invalid chars)
              </div>
              <div>• Password: "123" (too short), "123456" (valid)</div>
              <div>• Age: "15" (too young), "25" (valid)</div>
            </div>

            {validationLog.length === 0 ? (
              <div style={{ color: "#6b7280", fontStyle: "italic" }}>
                No validation events yet. Start typing to see your custom
                validators in action...
              </div>
            ) : (
              validationLog.map((log, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "4px",
                    padding: "4px",
                    background: index === 0 ? "#374151" : "transparent",
                    borderRadius: "4px",
                    borderLeft: log.includes("❌")
                      ? "3px solid #ef4444"
                      : log.includes("✅")
                      ? "3px solid #10b981"
                      : log.includes("🎉")
                      ? "3px solid #3b82f6"
                      : "3px solid #6b7280",
                  }}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTestComponent;
