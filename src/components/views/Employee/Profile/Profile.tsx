"use client"
import { Tabs } from "@heroui/react";
import useProfile from "./useProfile";
import TabInfo from "./TabInfo";
import TabPassword from "./TabPassword";

const Profile = () => {
  const {
    dataUser,
    isLoadingUser,
    refetchUser,
    isRefetchingUser,
    isErrorUser,
    errorUser
  } = useProfile();

  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      {isErrorUser ? (
        <div>
          {errorUser?.message}
        </div>
      ):(
        <Tabs className="w-full max-w-xl">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="overview">
                Info
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="analytics">
                Password
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel className="pt-4 px-0" id="overview">
            <TabInfo
              dataInfo={dataUser}
              refetch={refetchUser}
              isLoading={isLoadingUser}
              isRefetching={isRefetchingUser}
            />
          </Tabs.Panel>

          <Tabs.Panel className="pt-4 px-0" id="analytics">
            <TabPassword 
              refetch={refetchUser}
              isRefetching={isRefetchingUser}
            />
          </Tabs.Panel>
        </Tabs>
      )}
    </div>
  )
}

export default Profile;