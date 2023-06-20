import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "./_app";
import RootLayout from "~/components/layout";
import { DashboardShell } from "~/components/layout/dashboard-shell";
import { DashboardHeader } from "~/components/layout/dashbord-header";
import TaskDetail from "~/components/task-detail";
import { Button } from "@chakra-ui/react";
import TaskList from "~/components/task-list/task-list";
import TaskListSkeleton from "~/components/task-list/task-list-skeleton";
import NoTaskPlaceholder from "~/components/ui/no-task-placeholder";

const Home: NextPageWithLayout = () => {
  const tasks = api.task.getAll.useQuery()

  return (
    <>
      <TaskDetail />
      <DashboardShell>
        <DashboardHeader heading="Tasks" text="Create and manage Tasks.">
          <Link href={"/new"}>
            <Button size={"md"} variant="outline">
              New Task
            </Button>
          </Link>
        </DashboardHeader>
        <div className="mt-6 space-y-4">
          {
            tasks.isLoading ?
              (
                <TaskListSkeleton />
              )
              : (tasks.data?.length ? (
                <TaskList tasks={tasks.data} />
              )
                : <NoTaskPlaceholder />
              )
          }
        </div>
      </DashboardShell>

    </>
  )
}



export default Home;

Home.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  )
}
