
import type {RGLayouter, } from '@/relation-graph/vue3'
import { Ref } from "vue";
import RelationGraph from "@/relation-graph/vue3";

export interface IGraphLayouter extends RGLayouter {

  doBeforeLayout:() => void;
}
