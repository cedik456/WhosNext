import { Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/useAuth";


const AccountSettings = () => {
  const { logout } = useAuth();
  return (
    <SafeAreaView className='flex-1'>
      <View className="flex-row items-center px-4 pb-3 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="ml-2 text-lg font-semibold">Account Settings</Text>
      </View>
       <View className='px-6 mt-7'>
                 <Text className="ml-2 text-lg font-semibold">Verify Email</Text>
                 <Text className="ml-2 text-lg font-regular">We send an email to ch*****@gmail.com. Please check you inbox and get the actual code to verify.</Text>
                 <TextInput 
                 className='px-4 py-3 text-lg text-gray-500 bg-white border border-gray-300 shadow-sm rounded-xl' />
                 <Pressable className="py-4 mt-5 bg-black rounded-full">
                    <Text className="text-center text-white">
                      Verify Account
                    </Text>
                 </Pressable>
                 <TouchableOpacity className='mt-3'>
                    <Text className='text-center text-gray-400'>
                      Resend Code
                    </Text>
                 </TouchableOpacity>
                 
              </View>

              <Button
          title="Logout"
          onPress={logout}
          className="px-2 py-4 bg-red-500 rounded-xl "
          textClassName="text-center"
        />
    </SafeAreaView>
  )
}

export default AccountSettings