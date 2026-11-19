import SwiftUI

@main
struct CmodemAppApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    @StateObject private var host = HostCoordinator.shared

    init() {
        AppDelegate.host = HostCoordinator.shared
    }

    var body: some Scene {
        WindowGroup {
            BoardView()
                .environmentObject(host)
                .ignoresSafeArea()
        }
    }
}
