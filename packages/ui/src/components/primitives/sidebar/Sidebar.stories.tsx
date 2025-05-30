import type { Meta, StoryObj } from "@storybook/react";
import { IconName } from "../../../assets/utils/icon-mapping";
import { Icon } from "../icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./Sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: "dashboard",
  },
  {
    title: "Inbox",
    url: "#",
    icon: "email",
  },
  {
    title: "Calendar",
    url: "#",
    icon: "calendar",
  },
  {
    title: "Search",
    url: "#",
    icon: "search",
  },
  {
    title: "Settings",
    url: "#",
    icon: "settings",
  },
];

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  //   decorators: [
  //     (Story) => (
  //       <SidebarProvider>
  //         <div className="flex min-h-screen">
  //           <SidebarTrigger />
  //           <Story />
  //           <SidebarInset>
  //             <div className="p-lg">
  //               <h1 className="text-xl font-bold">Main Content Area</h1>
  //               <p>This is your main app layout next to the sidebar.</p>
  //             </div>
  //           </SidebarInset>
  //         </div>
  //       </SidebarProvider>
  //     ),
  //   ],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <Icon name={item.icon as IconName} size="xl" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
      <SidebarInset>
        <div className="p-lg">
          <h1 className="text-xl font-bold">Main Content Area</h1>
          <p>This is your main app layout next to the sidebar.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
