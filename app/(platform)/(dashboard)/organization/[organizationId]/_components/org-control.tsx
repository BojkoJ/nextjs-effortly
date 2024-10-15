"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
	// Tento komponent hlídá změnu organizace v URL a pokud se změní id organizace v URL:
	// Tak se změní aktivní organizace v Clerk configu
	const params = useParams();
	const { setActive } = useOrganizationList();

	useEffect(() => {
		if (!setActive) return;

		setActive({
			organization: params.organizationId as string,
		});
	}, [setActive, params.organizationId]);

	return null;
};

export default OrgControl;
