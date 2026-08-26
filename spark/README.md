# Apache Spark Lab — 20 Questions

Completed practical Spark lab covering Scala, RDDs, transformations/actions, Word Count, DAGs, lazy evaluation, broadcast variables, and accumulators.

## Environment
- Apache Spark 3.5.3
- Scala 2.12.18
- OpenJDK 17.0.19
- Spark master: `local[*]`
- Ubuntu 26.04 LTS

## Completed Topics

1. Scala collections and `for`/`yield`
2. Scala `map`
3. RDD creation with `parallelize`
4. RDD `map`
5. RDD `filter`
6. Partitions and `glom`
7. RDD lineage with `toDebugString`
8. File input with `textFile`
9. `flatMap` word extraction
10. Pair RDDs
11. `reduceByKey` Word Count
12. PySpark RDD basics
13. Spark execution concepts
14. Broadcast variables
15. Accumulators
16. Transformations and actions
17. Shuffle and wide dependencies
18. Actions: `count`, `collect`, `saveAsTextFile`
19. Lazy evaluation and transformation pipelining
20. Broadcast + accumulator practical example

## Final Practical Example

A broadcast lookup map classified error codes:

```scala
val lookup = Map(
  "E1" -> "Critical",
  "E2" -> "Warning",
  "E3" -> "Info"
)

val lookupBroadcast = sc.broadcast(lookup)
val unknownCount = sc.longAccumulator("unknownCount")

val codes = sc.parallelize(List("E1", "E2", "E1", "E3", "E9"))

val labeled = codes.map { code =>
  if (lookupBroadcast.value.contains(code)) {
    (code, lookupBroadcast.value(code))
  } else {
    unknownCount.add(1)
    (code, "Unknown")
  }
}

labeled.collect().toList
println(unknownCount.value)
```

Result:

```text
List((E1,Critical), (E2,Warning), (E1,Critical), (E3,Info), (E9,Unknown))
1
```

## Q18 Verification

```scala
val testRDD = sc.parallelize(List(1, 2, 3, 4, 5))
val filteredTest = testRDD.filter(_ % 2 == 0)
filteredTest.count()
filteredTest.collect().toList
filteredTest.saveAsTextFile("file:///home/vishnupriya/output/q18-result")
```

Output:

```text
count = 2
collect = List(2, 4)
saved output = 2, 4
```

## Q19 Lazy Evaluation Verification

```scala
val data = sc.parallelize(1 to 10)
val result = data.filter(_ % 2 == 0).map(_ * 10)
result.collect().toList
```

Result:

```text
List(20, 40, 60, 80, 100)
```

## Note on PySpark

The PySpark environment successfully imported Spark, but Python RDD operations using Python lambdas caused a segmentation fault under Python 3.14.4 with Spark 3.5.3. Scala Spark execution remained functional and was used for the remaining practical exercises.

## Key Concepts

- **Transformation:** creates a new RDD and is evaluated lazily.
- **Action:** triggers execution and returns or writes a result.
- **DAG:** represents the computation lineage and dependencies.
- **Narrow dependency:** child partitions depend on limited parent partitions.
- **Wide dependency:** data is redistributed across partitions, typically causing a shuffle.
- **Broadcast variable:** efficiently distributes read-only reference data to tasks.
- **Accumulator:** allows tasks to add values to a driver-visible metric.
- **Lazy evaluation:** allows Spark to optimize the complete transformation pipeline before execution.
