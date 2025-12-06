import { prisma } from "@/lib/prisma";

/**
 * Admin analytics page - only accessible in development mode.
 * Displays total visits count and a table of recent visits.
 */
export default async function AnalyticsPage() {
    // Only render in development mode for security
    if (process.env.NODE_ENV !== "development") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500">
                        Access Denied
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Analytics dashboard is only available in development
                        mode.
                    </p>
                </div>
            </div>
        );
    }

    // Fetch analytics data
    const [totalVisits, recentVisits] = await Promise.all([
        prisma.visit.count(),
        prisma.visit.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
        }),
    ]);

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-3xl font-bold">Analytics Dashboard</h1>

                {/* Stats Card */}
                <div className="mb-8 rounded-lg bg-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-gray-400">
                        Total Visits
                    </h2>
                    <p className="mt-2 text-4xl font-bold text-blue-400">
                        {totalVisits.toLocaleString()}
                    </p>
                </div>

                {/* Recent Visits Table */}
                <div className="overflow-x-auto rounded-lg bg-gray-800">
                    <h2 className="border-b border-gray-700 p-4 text-lg font-semibold">
                        Recent Visits
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700 text-left text-gray-400">
                                <th className="px-4 py-3">Path</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Referrer</th>
                                <th className="px-4 py-3">User Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentVisits.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        No visits recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                recentVisits.map((visit) => (
                                    <tr
                                        key={visit.id}
                                        className="border-b border-gray-700 hover:bg-gray-750"
                                    >
                                        <td className="px-4 py-3 font-mono text-sm text-blue-300">
                                            {visit.path}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">
                                            {new Date(
                                                visit.createdAt
                                            ).toLocaleString()}
                                        </td>
                                        <td
                                            className="max-w-xs truncate px-4 py-3 text-sm text-gray-400"
                                            title={visit.referrer || undefined}
                                        >
                                            {visit.referrer || "-"}
                                        </td>
                                        <td
                                            className="max-w-xs truncate px-4 py-3 text-sm text-gray-500"
                                            title={visit.userAgent || undefined}
                                        >
                                            {visit.userAgent || "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Note */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Showing last {Math.min(recentVisits.length, 50)} visits
                </p>
            </div>
        </div>
    );
}
