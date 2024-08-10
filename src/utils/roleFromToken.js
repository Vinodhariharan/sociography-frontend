function base64UrlDecode(str) {
    // Base64URL decode
    return Buffer.from(str, 'base64url').toString('utf8');
}

export function getRoleFromToken(token) {
    try {
        // Split the token into its components
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT does not have 3 parts');
        }

        // Get the payload part (second part)
        const payload = parts[1];

        // Decode the payload
        const decodedPayload = base64UrlDecode(payload);

        // Parse JSON payload
        const payloadObj = JSON.parse(decodedPayload);

        // Extract the role from the payload
        const role = payloadObj.role;

        return role;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}
