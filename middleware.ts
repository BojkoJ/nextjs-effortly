import {
	clerkMiddleware,
	createRouteMatcher,
	redirectToSignIn,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware((auth, request) => {
	if (!isPublicRoute(request)) {
		auth().protect();
	}

	if (auth().userId && isPublicRoute(request)) {
		// Pokud je user přihlášený a chce se dostat na landing page:
		// Přesměruj ho na výběr organizace
		let path = "/select-org";

		if (auth().orgId) {
			// Pokud je user přihlášený a má vybranou organizaci:
			// Přesměruj ho na jeho organizaci
			path = `/organization/${auth().orgId}`;
		}

		const orgSelection = new URL(path, request.url);
		return NextResponse.redirect(orgSelection);
	}

	// User není přihlášený a chce se dostat na protected routu
	if (!auth() && !isPublicRoute(request)) {
		return auth().redirectToSignIn({ returnBackUrl: request.url });
	}

	// User je přihlášený a nemá vybranou organizaci a není na routě pro výběr organizace (/select-org)
	if (
		auth().userId &&
		!auth().orgId &&
		request.nextUrl.pathname !== "/select-org"
	) {
		const orgSelection = new URL("/select-org", request.url);
		return NextResponse.redirect(orgSelection);
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
