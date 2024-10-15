"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
	storageKey?: string; // Storage key pro local storage - budeme používat k tomu aby jsme uložili stav sidebaru (rozbalený/zabalený)
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
	const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
		storageKey,
		{}
	);
	// tento objekt vypadá takto: { "workspace-id": true/false } - true znamená že je rozbalený, false že je zabaleny

	const { organization: activeOrganization, isLoaded: isLoadedOrg } =
		useOrganization();

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	// Zde používáme reduce k tomu aby jsme z objektu expanded vytáhli jen klíče, které mají hodnotu true
	// A tyto klíče dáváme do pole stringů, které pak použijeme jako defaultní hodnotu pro Accordion
	// Toto děláme proto, že komponent Accordion od Shadcn očekává pole stringů jako defaultní hodnotu
	const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
		(acc: string[], key: string) => {
			if (expanded[key]) {
				acc.push(key);
			}

			return acc;
		},
		[]
	);

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !curr[id],
		}));
	};

	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<div className='flex items-center jusitfy-between mb-2'>
					<Skeleton className='h-10 w-[50%]' />
					<Skeleton className='h-10 w-10' />
				</div>
				<div className='space-y-2'>
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
		);
	}

	return (
		<>
			<div className='font-medium text-xs flex items-center mb-1'>
				<span className='pl-4'>Workspaces</span>
				<Button
					asChild
					type='button'
					size='icon'
					variant='ghost'
					className='ml-auto'
				>
					<Link href='/select-org'>
						<Plus className='h-4 w-4' />
					</Link>
				</Button>
			</div>

			<Accordion
				type='multiple'
				defaultValue={defaultAccordionValue}
				className='space-y-2'
			>
				{userMemberships.data.map(({ organization }) => (
					<NavItem
						key={organization.id}
						isActive={activeOrganization?.id === organization.id}
						isExpanded={expanded[organization.id]}
						organization={organization as Organization}
						onExpand={onExpand}
					/>
				))}
			</Accordion>
		</>
	);
};

export default Sidebar;
