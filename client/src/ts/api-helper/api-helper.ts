import { getCookie, notUndefined } from "@markaronin/jefferson-util";

export interface UnsuccessfulResponse {
    success: false,
    reason: string,
}

export class APIHelper {
    // Public variables

    private static rawJwt = notUndefined(getCookie("Auth"));
    private static rawJwtPayload = APIHelper.rawJwt.split(".")[1];
    public static jwtPayload: { data: { id: string; username: string; email: string } } = JSON.parse(
        window.atob(APIHelper.rawJwtPayload),
    );

    // Public functions

    // Private methods

    private static readonly baseUrl = "https://api.bunling-bun.markaronin.com";

    private static jsonGetRequest(url: string): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "GET",
        });
    }

    private static jsonPutRequest(url: string, body: unknown): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    private static jsonPostRequest(url: string, body: unknown): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    private static jsonDeleteRequest(url: string): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "DELETE",
        });
    }

    private static handleFetch(url: string, options: RequestInit): Promise<any | UnsuccessfulResponse> {
        return fetch(`${APIHelper.baseUrl}/${url}`, {
            ...options,
            headers: { ...options.headers, authorization: `Bearer ${APIHelper.rawJwt}` },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error(response);
                    throw new Error("Something went wrong");
                }
            })
            .catch((reason) => {
                console.error(reason);
                return { success: false };
            });
    }
}
