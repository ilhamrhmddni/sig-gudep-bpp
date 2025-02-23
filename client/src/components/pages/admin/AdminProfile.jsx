<div className="mt-6">
  <h2 className="text-xl font-bold">Change Password</h2>
  <input
    type="password"
    placeholder="New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF] w-full"
  />
  <button
    onClick={() => handlePasswordChange(selectedUserId)} // Replace with the actual user ID
    className="mt-2 w-full bg-[#9500FF] text-white font-bold p-3 rounded-md hover:bg-[#9500FF] transition duration-200"
  >
    Update Password
  </button>
</div>;
