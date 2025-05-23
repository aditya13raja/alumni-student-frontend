import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AlumniList = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllAlumni = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/alumni/list')
                const data = await res.json()

                setAlumni(data.alumni)
                setLoading(false)
            } catch(error) {
                setLoading(false)
                setError("Error loading alumni list:", error)
            }
        }

        fetchAllAlumni()
    }, [])

    console.log(alumni)

    return (
        <div className="mt-5 pb-10">
            <h1 className="text-4xl text-blue-900 font-bold mb-6 text-center tracking-tight">
                Alumni List 
            </h1>
            <div>
                {loading && (
                    <p className="text-center text-gray-800">
                        Loading...
                    </p>    
                )}
                {error && (
                    <p className="text-4xl text-gray-500 text-center mt-5">
                        Something went wrong!
                    </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alumni.map((alum, index) => (
                        <Card key={index} className="glass-card hover:scale-[1.03] hover:shadow-xl transition-all duration-200">
                            <CardHeader>
                                <CardTitle className="text-xl text-[hsl(var(--foreground))]">
                                    {`${alum.first_name.charAt(0).toUpperCase() + alum.first_name.slice(1)} ${alum.last_name.charAt(0).toUpperCase() + alum.last_name.slice(1)}`}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-1 text-[hsl(var(--muted-foreground))] text-sm">
                                <p><span className="font-medium">Email:</span> {alum.email}</p>
                                <p><span className="font-medium">Age:</span> {alum.age}</p>
                                <p><span className="font-medium">Degree:</span> {alum.degree}</p>
                                <p><span className="font-medium">Major:</span> {alum.major}</p>
                                <p><span className="font-medium">Passing Year:</span> {alum.passing_year}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default AlumniList
