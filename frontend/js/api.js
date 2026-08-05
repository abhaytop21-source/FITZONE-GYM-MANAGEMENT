
const API_BASE_URL = "http://localhost:5000/api";

/**
 * POST Request
 */
export async function post(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        return result;

    } catch (error) {
        throw error;
    }
}

/**
 * GET Request
 */
export async function get(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        return result;

    } catch (error) {
        throw error;
    }
}