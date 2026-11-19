import UIKit

final class AppDelegate: NSObject, UIApplicationDelegate {
    static var host: HostCoordinator?

    func applicationDidBecomeActive(_ application: UIApplication) {
        AppDelegate.host?.setActive(true)
    }

    func applicationWillResignActive(_ application: UIApplication) {
        AppDelegate.host?.setActive(false)
    }
}
